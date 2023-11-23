import CreateForm from "./CreateForm";
import TodoList from "./TodoList";
import UserBlock from "./UserBlock";
import "./App.scss";
import useStatuses from "../../hooks/useStatuses";

function App() {
	const statusMessage = useStatuses();
	return (
		<div className={"container"}>
			<h1>Lertam TODO App</h1>
			<div className={"status"}>{statusMessage}</div>
			<CreateForm />
			<TodoList />
			<UserBlock />
		</div>
	);
}

export default App;
