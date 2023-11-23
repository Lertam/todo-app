import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("todo-app") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
