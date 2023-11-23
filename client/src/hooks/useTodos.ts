import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "../store";
import {
	useCreateTodoMutation,
	useGetTodosQuery,
	useUpdateTodoMutation,
} from "../store/api";
import { SerializedError } from "@reduxjs/toolkit";
import {
	TodoOrderEnum,
	setAdminMode,
	setEditingTodoId,
	setOrder,
	setPage,
	setStatusMessage,
} from "../store/app";
import { useNavigate } from "react-router-dom";

export type Todo = {
	id: number;
	title: string;
	username: string;
	email: string;
	completed: boolean;
	editedByAdmin: boolean;
};

export interface PaginatedTodos {
	totalPages: number;
	items: Todo[];
}

type TodosError = FetchBaseQueryError | SerializedError;
export interface IUseTodos {
	todos: Todo[];
	totalPages: number;
	currentPage: number;
	loadPage: (page: number) => void;
	currentOrder: TodoOrderEnum;
	changeOrder: (nextOrder: TodoOrderEnum) => void;
	isLoading: boolean;
	isCreating: boolean;
	isUpdating: boolean;
	queryError?: TodosError;
	createTodo: CreateTodoFunction;
	createError?: TodosError;
	setCompleteStatus: SetCompleteStatusFunction;
	updateError?: TodosError;
	updateTodoTitle: UpdateTodoTitleFunction;
}

export type CreateTodoFunction = (todo: Omit<Todo, "id">) => Promise<void>;
/**
 * Выставляет статус "Выполнено" или противоположный
 * @param todoId: number - ID задачи
 * @param completed: boolean - true, для установки статуса "Выполнено", false - для противоположного
 */
export type SetCompleteStatusFunction = (
	todoId: number,
	completed: boolean
) => Promise<void>;

export type UpdateTodoTitleFunction = (
	todoId: number,
	newTitle: string
) => Promise<void>;

const useTodos = (): IUseTodos => {
	const { page, order } = useAppSelector((state) => ({
		page: state.app.page,
		order: state.app.order,
	}));
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loadPage = (page: number) => {
		dispatch(setPage(page));
	};

	const {
		data: { items: todos, totalPages } = { items: [], totalPages: 0 },
		isLoading,
		error: queryError,
	} = useGetTodosQuery({ page, order });

	const [create, { isLoading: isCreating, error: createError }] =
		useCreateTodoMutation();
	const createTodo: CreateTodoFunction = async (todo) => {
		const result: any = await create(todo);
		if (result.error && (result.error as { status: number }).status === 401) {
			dispatch(setAdminMode(false));
			dispatch(setStatusMessage("Необходима авторизация"));
			navigate("/login");
		}
	};

	const [update, { isLoading: isUpdating, error: updateError }] =
		useUpdateTodoMutation();
	const setCompleteStatus: SetCompleteStatusFunction = async (
		id,
		completed
	) => {
		const result: any = await update({ id, completed });
		if (result.error && (result.error as { status: number }).status === 401) {
			dispatch(setAdminMode(false));
			dispatch(setStatusMessage("Необходима авторизация"));
			navigate("/login");
		}
	};

	const updateTodoTitle: UpdateTodoTitleFunction = async (id, newTitle) => {
		if (newTitle.length === 0) {
			throw new Error("Empty new title");
		}
		const result: any = await update({ id, title: newTitle });
		if (result.error && (result.error as { status: number }).status === 401) {
			dispatch(setAdminMode(false));
			dispatch(setStatusMessage("Необходима авторизация"));
			dispatch(setEditingTodoId(null));
			navigate("/login");
		}
	};

	const changeOrder = (newOrder: TodoOrderEnum) => {
		dispatch(setOrder(newOrder));
	};

	return {
		todos,
		totalPages,
		currentPage: page,
		loadPage,
		currentOrder: order,
		changeOrder,
		isLoading,
		isCreating,
		isUpdating,
		queryError,
		createTodo,
		createError,
		setCompleteStatus,
		updateError,
		updateTodoTitle,
	};
};

export default useTodos;
