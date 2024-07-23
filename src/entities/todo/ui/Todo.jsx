import { ButtonUI } from "@/shared/ui/buttonUI/ButtonUI";
import styles from "./Todo.module.sass";
import cls from "classnames";

export const Todo = ({
	todoList = [],
	selectedTask,
	onOpenForm,
	onSelectTask,
	onOpenDeleteForm,
	onCompletedTask,
	onOpenFilterForm,
	className,
}) => {
	const handleClickToTask = (task) => () => {
		const isSelected = selectedTask?.id === task.id;

		onSelectTask(isSelected ? null : task);
	};

	return (
		<div className={cls(styles.todo, className)}>
			<div className={styles.todoList}>
				{todoList.map((task) => (
					<div
						key={task.id}
						onClick={handleClickToTask(task)}
						className={cls(styles.task, selectedTask?.id === task.id ? styles.task_selected : "")}
					>
						<div className={styles.taskTitle}>
							<h3 className={styles.title} title={task.title}>
								{task.title}
							</h3>
							<span>{task.isCompleted && "(Выполнена)"}</span>
							<span className={styles.date}>Дата завершения: {task.dateEnd}</span>
						</div>
						<span className={styles.desciption}>{task.description}</span>
					</div>
				))}
			</div>
			<div className={styles.btns}>
				<ButtonUI onClick={onOpenForm("add")} className={styles.btn}>
					Добавить
				</ButtonUI>
				<div className={styles.borderLeft} />
				<ButtonUI onClick={onOpenForm("edit")} className={styles.btn}>
					Редактировать
				</ButtonUI>
				<div className={styles.borderLeft} />
				<ButtonUI onClick={onOpenDeleteForm} className={styles.btn}>
					Удалить
				</ButtonUI>
				<div className={styles.borderLeft} />
				<ButtonUI onClick={onCompletedTask} className={styles.btn}>
					{selectedTask?.isCompleted ? "Убрать из завершенных" : "Завершить"}
				</ButtonUI>
				<div className={styles.borderLeft} />
				<ButtonUI onClick={onOpenFilterForm} className={styles.btn}>
					Фильтры
				</ButtonUI>
			</div>
		</div>
	);
};
