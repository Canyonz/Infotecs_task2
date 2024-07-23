import { ButtonUI } from "@/shared/ui/buttonUI/ButtonUI";
import styles from "./FormUpdateTodo.module.sass";
import cls from "classnames";
import { InputUI } from "@/shared/ui/inputUI/InputUI";
import { useEffect, useState } from "react";

export const FormUpdateTodo = ({ isAdd, selectedTask, onSubmit, onClose, className }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dateEnd, setDateEnd] = useState("");

	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	const clearForm = () => {
		setTitle("");
		setDescription("");
		setDateEnd("");
	};

	const handleOnSubmitForm = (event) => {
		event.preventDefault();

		if (!isAdd) {
			return onSubmit({ id: selectedTask?.id, title, description, dateEnd, isCompleted: selectedTask?.isCompleted });
		}
		clearForm();
		onSubmit({ id: Date.now(), title, description, dateEnd, isCompleted: false });
	};

	useEffect(() => {
		if (!isAdd) {
			setTitle(selectedTask?.title ?? "");
			setDescription(selectedTask?.description ?? "");
			setDateEnd(selectedTask?.dateEnd ?? "");

			return;
		}

		clearForm();
	}, [isAdd, selectedTask?.dateEnd, selectedTask?.description, selectedTask?.title]);

	return (
		<div className={cls(styles.formUpdateTodo, className)}>
			<div className={styles.titleForm}>
				<ButtonUI onClick={onClose} className={styles.closeForm}>
					X
				</ButtonUI>
				<h2>Форма {isAdd ? "добавления" : "редактирования"} задачи</h2>
			</div>
			<form id="form" onSubmit={handleOnSubmitForm} className={styles.form}>
				<InputUI title="Заголовок" placeholder="Введите заголовок задачи" required value={title} onChange={setTitle} />
				<div className={styles.descriptionWrapper}>
					<span>Описание</span>
					<textarea
						rows={20}
						placeholder="Введите описание задачи"
						value={description}
						onChange={handleChangeDescription}
						className={styles.description}
					></textarea>
				</div>
				<InputUI title="Дата завершения" type="date" required value={dateEnd} onChange={setDateEnd} />
			</form>
			<ButtonUI type="submit" form="form">
				{isAdd ? "Добавить" : "Изменить"}
			</ButtonUI>
		</div>
	);
};
