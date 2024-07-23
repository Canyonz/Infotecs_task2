import styles from "./InputUI.module.sass";
import cls from "classnames";

export const InputUI = ({ value, type = "text", title = "", placeholder = "", required = false, onChange, className }) => {
	const additionalClass = title ? "" : className;

	const handleOnChange = (e) => {
		onChange(e.target.value);
	};

	const input = (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			required={required}
			onChange={handleOnChange}
			className={cls(styles.inputUI, additionalClass)}
		/>
	);

	if (title)
		return (
			<div className={cls(styles.inputUIWrapper, className)}>
				<span className={styles.title}>{title}</span>
				{input}
			</div>
		);

	return input;
};
