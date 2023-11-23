import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useTodos, { Todo } from "../../../hooks/useTodos";
import { closeModal, setStatusMessage } from "../../../store/app";
import { useAppDispatch, useAppSelector } from "../../../store";

export const EMPTY_TODO: Todo = {
	id: -1,
	title: "",
	username: "",
	email: "",
	completed: false,
	editedByAdmin: false,
};

const EMAIL_REGEX =
	// eslint-disable-next-line no-control-regex
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const ModalForm: FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Omit<Todo, "id">>();
	const { createTodo, isCreating } = useTodos();

	const dispatch = useAppDispatch();
	const onSubmit: SubmitHandler<Omit<Todo, "id">> = (data) =>
		createTodo(data).then(() => {
			dispatch(closeModal());
			reset();
			dispatch(setStatusMessage("Задача добавлена!"));
		});

	const isOpen = useAppSelector((state) => state.app.modalOpen);
	if (!isOpen) return null;
	return (
		<div className={"modal-todo"}>
			<div
				className={"overlay"}
				onClick={() => {
					dispatch(closeModal());
					reset();
				}}
			/>
			<div className={"content"}>
				<h2>Новая задача</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={"form-item"}>
						<label htmlFor={"taskInput"}>Текст задачи:</label>
						<textarea
							id={"taskInput"}
							{...register("title", { required: true })}
						/>
						{errors.title && <span>Проверьте поле</span>}
					</div>
					<div className={"form-item"}>
						<label htmlFor={"usernameInput"}>Имя пользователя:</label>
						<input
							id={"usernameInput"}
							{...register("username", { required: true })}
						/>
						{errors.username && <span>Проверьте поле</span>}
					</div>
					<div className={"form-item"}>
						<label htmlFor={"emailInput"}>Email:</label>
						<input
							id={"emailInput"}
							type={"email"}
							{...register("email", { required: true, pattern: EMAIL_REGEX })}
						/>
						{errors.email && <span>Проверьте поле</span>}
					</div>
					<div className={"footer"}>
						<button
							className={"cancel-button"}
							type={"reset"}
							onClick={(ev) => {
								ev.preventDefault();
								dispatch(closeModal());
							}}
						>
							Отмена
						</button>
						<button className={"submit-button"} type={"submit"}>
							{isCreating ? "Добавляем" : "Добавить"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalForm;
