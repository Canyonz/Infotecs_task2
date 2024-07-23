import styles from "./SelectListUI.module.sass";
import cls from "classnames";

export const SelectListUI = ({ value, options = [], onChange, className }) => {
	const handleOnChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<select value={value} onChange={handleOnChange} className={cls(styles.selectListUI, className)}>
			{options.map((option, index) => (
				<option key={index} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
};
