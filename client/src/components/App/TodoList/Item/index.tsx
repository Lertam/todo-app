import { FC } from "react";
import useTodos, { Todo } from "../../../../hooks/useTodos";
import TodoTitle from "./TodoTitle";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setEditingTodoId } from "../../../../store/app";
import CompleteButton from "./CompleteButton";
import useUser from "../../../../hooks/useUser";

const TodoItem: FC<{ todo: Todo }> = ({ todo }) => {
	const editingTodoId = useAppSelector((state) => state.app.editingTodoId);
	const { adminMode } = useUser();
	const dispatch = useAppDispatch();
	const { updateTodoTitle } = useTodos();

	return (
		<div className={"todo-item"}>
			<TodoTitle
				editMode={adminMode && editingTodoId === todo.id}
				title={todo.title}
				onEditStart={() => dispatch(setEditingTodoId(todo.id))}
				onEditEnd={({ title }) => {
					if (title !== todo.title) {
						updateTodoTitle(todo.id, title).then(() =>
							dispatch(setEditingTodoId(null))
						);
					} else {
						dispatch(setEditingTodoId(null));
					}
				}}
			/>
			<span className={"footer"}>
				<span>
					{todo.username} ({todo.email})
				</span>
				{todo.editedByAdmin && (
					<span className={"edited"}>отредактировано администратором</span>
				)}
			</span>

			<CompleteButton completed={todo.completed} todoId={todo.id} />
		</div>
	);
};

export default TodoItem;
