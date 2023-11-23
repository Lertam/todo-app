import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { TodoOrderEnum } from "./app";
import { getCookie } from "../utils";
import { PaginatedTodos, Todo } from "../hooks/useTodos";

const baseFetch: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
	fetchBaseQuery({
		baseUrl: "/api",
		prepareHeaders: (headers) => {
			const token = getCookie("token");
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseFetch,
	tagTypes: ["Todo"],
	endpoints: (builder) => ({
		getTodos: builder.query<
			PaginatedTodos,
			{ page: number; order: TodoOrderEnum }
		>({
			query: ({ page, order }) => `/?page=${page}&order=${order}`,
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }) => ({ type: "Todo" as const, id })),
							"Todo",
					  ]
					: ["Todo"],
		}),
		createTodo: builder.mutation<Todo, Omit<Todo, "id">>({
			query: (initialTodo) => ({
				url: "/",
				method: "POST",
				body: initialTodo,
			}),
			invalidatesTags: [{ type: "Todo" }],
		}),
		updateTodo: builder.mutation<
			Todo,
			{ id: number; title: string } | { id: number; completed: boolean }
		>({
			query: (updatedTodo) => ({
				url: `/${updatedTodo.id}`,
				method: "PUT",
				body: updatedTodo,
			}),
			invalidatesTags: (_, __, args) => [{ type: "Todo", id: args.id }],
		}),
		login: builder.mutation<
			{ token: string },
			{ login: string; password: string }
		>({
			query: ({ login, password }) => ({
				url: "/login",
				method: "POST",
				body: {
					login,
					password,
				},
			}),
		}),
	}),
});

export const {
	useGetTodosQuery,
	useCreateTodoMutation,
	useUpdateTodoMutation,
	useLoginMutation,
} = apiSlice;
