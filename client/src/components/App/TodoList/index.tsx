import Pagination from './Pagination';
import Sorting from './Sorting';
import TodoList from './List';
import useTodos from '../../../hooks/useTodos';
import { FC } from 'react';
import './styles.scss';

const TodoListContainer: FC = () => {
	const { isLoading, queryError } = useTodos();

	if (isLoading) return <span>Загружаем задачи</span>;
	if (queryError)
		return <span className={"error-text"}>{queryError.toString()}</span>;
	return (
		<div className={"todo-list"}>
			<Sorting />
			<TodoList />
			<Pagination />
		</div>
	);
};

export default TodoListContainer;
