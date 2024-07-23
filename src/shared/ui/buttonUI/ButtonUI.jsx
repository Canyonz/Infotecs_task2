import styles from "./ButtonUI.module.sass";
import cls from "classnames";

export const ButtonUI = ({ type = "button", form = "", children, onClick, className }) => {
	return (
		<button type={type} form={form} onClick={onClick} className={cls(styles.buttonUI, className)}>
			{children}
		</button>
	);
};
