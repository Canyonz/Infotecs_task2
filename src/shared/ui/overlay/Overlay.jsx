import styles from "./Overlay.module.sass";
import cls from "classnames";

export const Overlay = ({ onClick, className }) => {
	return <div className={cls(styles.overlay, className)} onClick={onClick} />;
};
