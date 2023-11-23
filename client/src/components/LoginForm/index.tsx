import useUser, { ILoginInput } from "../../hooks/useUser";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";
import useStatuses from "../../hooks/useStatuses";

const LoginForm: FC = () => {
	const { login, isLoading } = useUser();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<{ login: string; password: string }> = async (
		data
	) => {
		const loginSuccess = await login(data);
		if (loginSuccess) {
			navigate("/");
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginInput>({ defaultValues: { login: "", password: "" } });
	const statusMessage = useStatuses();
	return (
		<div className={"container admin-login"}>
			<h1>Вход админа</h1>
			<div className={"status error-text"}>{statusMessage}</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("login", { required: true })}
					placeholder={"Логин"}
					className={errors.login ? "error" : ""}
				/>
				{errors.login && <span className={"error-text"}>Проверьте поле</span>}
				<input
					{...register("password", { required: true })}
					type={"password"}
					placeholder={"Пароль"}
					className={errors.password ? "error" : ""}
				/>
				{errors.password && <span className={"error-text"}>Проверьте поле</span>}
				<button type={"submit"}>{isLoading ? "Проверям" : "Войти"}</button>
			</form>
			<Link to={"/"}>Назад</Link>
		</div>
	);
};

export default LoginForm;
