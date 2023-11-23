import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const UserBlock: FC = () => {
	const { adminMode, logout } = useUser();
	const navigate = useNavigate();
	return (
		<div className={"user-block"}>
			{adminMode ? (
				<>
					<span className={"helper"}>
						Для редактирования задачи кликните по заголовку
					</span>
					<button onClick={logout}>Выйти</button>
				</>
			) : (
				<button onClick={() => navigate("/login")}>Войти</button>
			)}
		</div>
	);
};

export default UserBlock;
