import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoTask: FC<{
	title: string;
	editMode: boolean;
	onEditStart: () => void;
	onEditEnd: SubmitHandler<{ title: string }>;
}> = ({ title, editMode, onEditStart, onEditEnd }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<{ title: string }>({ defaultValues: { title } });

	if (editMode) {
		return (
			<form onSubmit={handleSubmit(onEditEnd)}>
				<input {...register("title", { required: true })} />
				{errors.title && <span className={"error-text"}>Проверьте поле</span>}
				<button type={"submit"}>OK</button>
			</form>
		);
	}
	return (
		<span className={"task"} onClick={onEditStart}>
			{title}
		</span>
	);
};
export default TodoTask;
