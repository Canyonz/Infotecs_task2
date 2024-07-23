import { createPortal } from "react-dom";

export const Portal = ({ children, bind = document.body }) => {
	return createPortal(children, bind);
};
