import { FC } from "react";
import { TodoOrderEnum } from "../../../store/app";
import useTodos from "../../../hooks/useTodos";

const OPTION_NAME_MAP = {
	[TodoOrderEnum.NONE]: "По умолчанию",
	[TodoOrderEnum.USERNAME_DESC]: "По имени пользователя (desc)",
	[TodoOrderEnum.USERNAME_ASC]: "По имени пользователя (asc)",
	[TodoOrderEnum.EMAIL_DESC]: "По email (desc)",
	[TodoOrderEnum.EMAIL_ASC]: "По email (asc)",
	[TodoOrderEnum.COMPLETED_ASC]: "Сначала невыполненные",
	[TodoOrderEnum.COMPLETED_DESC]: "Сначала выполненные",
};

const Sorting: FC = () => {
	const sortingoptions = Object.values(TodoOrderEnum);

	const { currentOrder, changeOrder } = useTodos();

	return (
		<div className={"sorting"}>
			<span>Сортировка по: </span>
			<select
				value={currentOrder}
				onChange={(ev) => changeOrder(ev.target.value as TodoOrderEnum)}
			>
				{sortingoptions.map((key) => (
					<option value={key} key={`sort_opt_${key}`}>
						{OPTION_NAME_MAP[key]}
					</option>
				))}
			</select>
		</div>
	);
};

export default Sorting;
