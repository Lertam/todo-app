import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setStatusMessage } from "../store/app";

const useStatuses = () => {
	const statusMessage = useAppSelector((state) => state.app.statusMessage);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (statusMessage) {
			setTimeout(() => {
				dispatch(setStatusMessage(null));
			}, 5000);
		}
	}, [statusMessage, dispatch]);
	return statusMessage;
};

export default useStatuses;
