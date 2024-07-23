import { ButtonUI } from "@/shared/ui/buttonUI/ButtonUI";
import { SelectListUI } from "@/shared/ui/selectListUI/SelectListUI";
import styles from "./FormFilterTodo.module.sass";
import cls from "classnames";
import { completedOptionsList, sortOptionsList } from "../const/formFilterTodoConst";
import { useState } from "react";

export const FormFilterTodo = ({ acceptedFilters, onAccept, className }) => {
	const [sort, setSort] = useState(acceptedFilters?.sort);
	const [order, setOrder] = useState(acceptedFilters?.order);
	const [isCompleted, setIsCompleted] = useState(acceptedFilters?.isCompleted);

	const handleChangeSort = (value) => {
		setSort(value);
	};

	const handleChangeOrder = () => {
		const newSortOrder = order === "asc" ? "desc" : "asc";
		setOrder(newSortOrder);
	};

	const handleChangeCompleted = (value) => {
		setIsCompleted(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		onAccept({ sort, order, isCompleted });
	};

	const handleReset = () => {
		setSort(sortOptionsList[0].value);
		setOrder("asc");
		setIsCompleted(completedOptionsList[0].value);
	};

	return (
		<div className={cls(styles.formFilterTodo, className)}>
			<h3>Форма фильтров</h3>
			<form id="formFilter" onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.sortTodoWrapper}>
					<span>Сортировка</span>
					<div className={styles.sortTodo}>
						<SelectListUI value={sort} options={sortOptionsList} onChange={handleChangeSort} />
						<ButtonUI onClick={handleChangeOrder} className={styles.orderBtn}>
							{order === "asc" ? "▲" : "▼"}
						</ButtonUI>
					</div>
				</div>

				<div className={styles.filterTodoWrapper}>
					<span>Задачи</span>
					<SelectListUI value={isCompleted} options={completedOptionsList} onChange={handleChangeCompleted} />
				</div>
			</form>
			<div className={styles.btns}>
				<ButtonUI type="submit" form="formFilter">
					Ок
				</ButtonUI>
				<ButtonUI onClick={handleReset}>Сбросить фильтры</ButtonUI>
			</div>
		</div>
	);
};
