import { FC } from "react";
import { openModal } from "../../../store/app";
import { useAppDispatch } from "../../../store";
import "./styles.scss";
import ModalForm from "./ModalForm";

const CreateForm: FC = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<button
				className={"create-todo-button"}
				onClick={() => dispatch(openModal())}
			>
				Добавить
			</button>
			<ModalForm />
		</>
	);
};

export default CreateForm;
