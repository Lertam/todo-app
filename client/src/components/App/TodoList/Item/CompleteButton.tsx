import { FC } from "react";
import useTodos from "../../../../hooks/useTodos";
import CheckboxImage from "./checkbox.svg";
import { useAppSelector } from "../../../../store";

const CompleteButton: FC<{ completed: boolean; todoId: number }> = ({
	completed,
	todoId,
}) => {
	const { setCompleteStatus } = useTodos();
	const adminMode = useAppSelector((state) => state.app.adminMode);
	if (!adminMode) return null;
	return (
		<button
			title={
				completed ? "Отметить как невыполненную" : "Отметить как выполненную"
			}
			className={completed ? "completed" : ""}
			onClick={() => setCompleteStatus(todoId, !completed)}
		>
			<img src={CheckboxImage} alt={completed ? "Выполнено" : "Невыполнено"} />
		</button>
	);
};

export default CompleteButton;
