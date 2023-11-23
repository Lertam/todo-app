import appReducer, { AppState } from "./app";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api";
import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig: PersistConfig<AppState> = {
	key: "root",
	storage,
	whitelist: ["adminMode"],
};

const store = configureStore({
	reducer: {
		app: persistReducer<AppState>(persistConfig, appReducer),
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
