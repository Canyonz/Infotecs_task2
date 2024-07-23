import { Overlay } from "../overlay/Overlay";
import { Portal } from "../portal/Portal";
import styles from "./ModalUI.module.sass";
import cls from "classnames";

export const ModalUI = ({ children, onClose, className }) => {
	return (
		<Portal>
			<div className={cls(styles.modalUI, className)}>
				<Overlay onClick={onClose} />
				<div className={styles.content}>{children}</div>
			</div>
		</Portal>
	);
};
