import { FC } from "react";
import useTodos from "../../../hooks/useTodos";

const Pagination: FC = () => {
	const { currentPage, loadPage, totalPages } = useTodos();

	const paginationLinks = [];
	for (let i = 1; i <= totalPages; i++) {
		paginationLinks.push(
			<button
				key={`p${i}`}
				onClick={() => {
					loadPage(i);
				}}
				className={currentPage === i ? "active" : ""}
			>
				{i}
			</button>
		);
	}
	if (totalPages <= 1) return null;
	return <div className={"pagination"}>{paginationLinks}</div>;
};

export default Pagination;
