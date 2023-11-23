import { useAppDispatch, useAppSelector } from "../store";
import { useLoginMutation } from "../store/api";
import { setAdminMode, setStatusMessage } from "../store/app";
import { deleteCookie, setCookie } from "../utils";

export interface IUseUser {
	adminMode: boolean;
	login: LoginFunction;
	isLoading: boolean;
	logout: () => void;
}

export interface ILoginInput {
	login: string;
	password: string;
}

type LoginFunction = (data: ILoginInput) => Promise<boolean>;

const useUser = (): IUseUser => {
	const adminMode = useAppSelector((state) => state.app.adminMode);
	const dispatch = useAppDispatch();

	const [startLogin, { isLoading }] = useLoginMutation();

	const login: LoginFunction = async ({ login, password }) => {
		try {
			const { token } = await startLogin({ login, password }).unwrap();
			dispatch(setAdminMode(true));
			setCookie("token", token);
			return true;
		} catch (ex) {
			if ((ex as { status: number }).status !== 401) {
				alert("Неизвестная ошибка");
			} else {
				dispatch(setStatusMessage("Неправильный пароль"));
			}
			return false;
		}
	};

	const logout = () => {
		dispatch(setAdminMode(false));
		deleteCookie("token");
	};

	return { adminMode, login, isLoading, logout };
};

export default useUser;
