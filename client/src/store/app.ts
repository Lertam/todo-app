import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TodoOrderEnum {
	NONE = "none",
	USERNAME_DESC = "username_desc",
	USERNAME_ASC = "username_asc",
	EMAIL_DESC = "email_desc",
	EMAIL_ASC = "email_asc",
	COMPLETED_ASC = "completed_asc",
	COMPLETED_DESC = "completed_desc",
}

export interface AppState {
	page: number;
	order: TodoOrderEnum;
	modalOpen: boolean;
	adminMode: boolean;
	editingTodoId: null | number;
	statusMessage: string | null;
}

const initialState: AppState = {
	page: 1,
	order: TodoOrderEnum.NONE,
	modalOpen: false,
	adminMode: false,
	editingTodoId: null,
	statusMessage: null,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		setOrder: (state, action: PayloadAction<TodoOrderEnum>) => {
			state.order = action.payload;
		},
		setStatusMessage: (state, action: PayloadAction<string | null>) => {
			state.statusMessage = action.payload;
		},
		openModal: (state) => {
			state.modalOpen = true;
		},
		closeModal: (state) => {
			state.modalOpen = false;
		},
		setAdminMode: (state, action: PayloadAction<boolean>) => {
			state.adminMode = action.payload;
		},
		setEditingTodoId: (state, action: PayloadAction<number | null>) => {
			if (state.adminMode) {
				state.editingTodoId = action.payload;
			}
		},
	},
});

export const {
	setPage,
	setOrder,
	setStatusMessage,
	openModal,
	closeModal,
	setAdminMode,
	setEditingTodoId,
} = appSlice.actions;

export default appSlice.reducer;
