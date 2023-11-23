import { FC } from "react";
import useTodos from "../../../hooks/useTodos";
import TodoItem from "./Item";

const TodoList: FC = () => {
	const { todos } = useTodos();
	if (todos.length === 0) {
		return <div className={"no-items"}>Пока задач нет</div>;
	}
	return (
		<div className={"todo-list-inner"}>
			{todos.map((todo) => (
				<TodoItem key={`todo${todo.id}`} todo={todo} />
			))}
		</div>
	);
};

export default TodoList;
