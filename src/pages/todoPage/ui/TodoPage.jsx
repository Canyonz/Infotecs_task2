import { Todo } from "@/entities/todo";
import { FormUpdateTodo } from "@/features/formUpdateTodo";
import cls from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./TodoPage.module.sass";
import { ModalUI } from "@/shared/ui/modalUI/ModalUI";
import { ButtonUI } from "@/shared/ui/buttonUI/ButtonUI";
import { FormFilterTodo } from "@/features/formFilterTodo";
import { completedOptionsList, sortOptionsList } from "@/features/formFilterTodo/const/formFilterTodoConst";

//Это можно удалить, сделал для примера своих задач
const todoListMy = [
	{
		id: 1,
		title: "Интерфейс пользователя",
		description: `Главная страница должна содержать заголовок приложения и список задач.`,
		dateEnd: "2024-04-16",
		isCompleted: true,
	},
	{
		id: 2,
		title: "Интерфейс пользователя",
		description: `Форма для добавления новой задачи с полями: заголовок, описание и дата завершения.`,
		dateEnd: "2024-04-16",
		isCompleted: true,
	},
	{
		id: 3,
		title: "Интерфейс пользователя",
		description: `Кнопка для добавления задачи.`,
		dateEnd: "2024-04-16",
		isCompleted: true,
	},
	{
		id: 4,
		title: "Интерфейс пользователя",
		description: `Кнопки для редактирования и удаления каждой задачи.`,
		dateEnd: "2024-03-16",
		isCompleted: true,
	},
	{
		id: 5,
		title: "Функциональность",
		description: `Пользователь может добавлять задачи с заголовком, описанием и датой завершения.`,
		dateEnd: "2024-07-26",
		isCompleted: true,
	},
	{
		id: 6,
		title: "Функциональность",
		description: `Пользователь может редактировать существующие задачи.`,
		dateEnd: "2024-04-16",
		isCompleted: true,
	},
	{
		id: 7,
		title: "Функциональность",
		description: `Пользователь может удалять задачи.`,
		dateEnd: "2024-04-16",
		isCompleted: true,
	},
	{
		id: 8,
		title: "Функциональность",
		description: `Все задачи должны храниться в локальном хранилище браузера, чтобы при перезагрузке страницы данные не терялись.`,
		dateEnd: "2024-07-02",
		isCompleted: true,
	},
	{
		id: 9,
		title: "Дополнительные цели",
		description: `Валидация формы:
  - Добавить проверку ввода для формы добавления задачи, чтобы заголовок и дата завершения были обязательными полями.`,
		dateEnd: "2021-04-16",
		isCompleted: true,
	},
	{
		id: 10,
		title: "Дополнительные цели",
		description: `Анимация и переходы:
  - Добавить анимацию для добавления и удаления задач, чтобы интерфейс был более привлекательным.`,
		dateEnd: "2024-01-16",
		isCompleted: false,
	},
	{
		id: 11,
		title: "Дополнительные цели",
		description: `Фильтрация и сортировка:
  - Возможность фильтровать задачи по статусу (все, завершенные, незавершенные).
  - Возможность сортировать задачи по дате завершения.`,
		dateEnd: "2022-02-22",
		isCompleted: true,
	},
];

export const TodoPage = () => {
	const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("todo")) ?? todoListMy);
	const [filteredTodoList, setFilteredTodoList] = useState(todoList);
	const [isOpenForm, setIsOpenForm] = useState({ dom: false, open: false, isAdd: true });
	const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
	const [isOpenFilterForm, setIsOpenFilterForm] = useState(false);
	const [acceptedFilter, setAcceptedFilter] = useState({
		sort: sortOptionsList[0].value,
		order: "asc",
		isCompleted: completedOptionsList[0].value,
	});
	const [selectedTask, setSelectedTask] = useState();
	const [message, setMessage] = useState("");
	const timerRef = useRef();

	const isOpenClass = isOpenForm.open ? styles.todoWrapper_formOpen : "";
	const isHotCloseClass = !selectedTask && !isOpenForm.isAdd ? styles.todoWrapper_hotClose : "";

	const sendMessage = (text) => {
		setMessage(text);
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setMessage("");
		}, 5000);
	};

	const handleClickOpenUpdateForm = (status) => () => {
		if (status === "edit" && !selectedTask) return sendMessage("Для редактирования необходимо выбрать задачу");
		setMessage("");
		if (isOpenForm.dom) return setIsOpenForm((prev) => ({ ...prev, isAdd: status === "add" ? true : false }));
		setIsOpenForm({ dom: true, open: true, isAdd: status === "add" ? true : false });
	};

	const handleClickCloseUpdateForm = () => {
		setIsOpenForm((prev) => ({ ...prev, open: false }));
		setTimeout(() => {
			setIsOpenForm((prev) => ({ ...prev, dom: false }));
		}, 750);
	};

	const handleClickUpdateTodo = (value) => {
		if (isOpenForm.isAdd) return setTodoList((prev) => [...prev, value]);

		setTodoList((prev) => prev.map((task) => (task.id === value.id ? value : task)));
	};

	const handleClickOpenDeleteForm = () => {
		if (!selectedTask) return sendMessage("Для удаления необходимо выбрать задачу");
		setMessage("");

		setIsOpenDeleteForm(true);
	};

	const handleClickCloseDeleteForm = () => {
		setIsOpenDeleteForm(false);
	};

	const handleClickDeleteTask = () => {
		setTodoList((prev) => prev.filter((task) => task.id !== selectedTask.id));
		setIsOpenDeleteForm(false);
		setSelectedTask(null);
	};

	const handleClickIsCompletedTask = () => {
		if (!selectedTask) return sendMessage(`Чтобы завершить или убрать из завершенных необходимо выбрать задачу`);
		setMessage("");

		const isCompleted = selectedTask.isCompleted ? false : true;

		setSelectedTask((prev) => ({ ...prev, isCompleted: isCompleted }));
		setTodoList((prev) => prev.map((task) => (task.id === selectedTask.id ? { ...task, isCompleted: isCompleted } : task)));
	};

	const handleClickOpenFilterForm = () => {
		setIsOpenFilterForm(true);
	};

	const handleClickCloseFilterForm = () => {
		setIsOpenFilterForm(false);
	};

	const handleClickAcceptFilter = (options) => {
		setAcceptedFilter(options);
		setIsOpenFilterForm(false);
	};

	useEffect(() => {
		localStorage.setItem("todo", JSON.stringify(todoList));
	}, [todoList]);

	useEffect(() => {
		if (!selectedTask && !isOpenForm.isAdd) setIsOpenForm((prev) => ({ ...prev, open: false, dom: false }));
	}, [isOpenForm.isAdd, selectedTask]);

	useEffect(() => {
		if (acceptedFilter.sort === "without" && acceptedFilter.isCompleted === "all") {
			return setFilteredTodoList([...todoList]);
		}

		let newSortedTodoList = [];

		if (acceptedFilter.sort === "without") {
			newSortedTodoList = [...todoList];
		} else {
			newSortedTodoList = [...todoList].sort((a, b) =>
				acceptedFilter.order === "asc" && acceptedFilter.sort !== "without"
					? new Date(a[acceptedFilter.sort]) - new Date(b[acceptedFilter.sort])
					: new Date(b[acceptedFilter.sort]) - new Date(a[acceptedFilter.sort])
			);
		}

		let newFilteredTodoList = [];

		if (acceptedFilter.isCompleted === "all") {
			newFilteredTodoList = [...newSortedTodoList];
		} else {
			newFilteredTodoList = newSortedTodoList.filter((task) => task.isCompleted.toString() === acceptedFilter.isCompleted);
		}

		setFilteredTodoList(newFilteredTodoList);
	}, [acceptedFilter.isCompleted, acceptedFilter.order, acceptedFilter.sort, todoList]);

	return (
		<main className={styles.todoPage}>
			<h1 className={styles.title}>Todo Infotecs</h1>
			<div className={styles.content}>
				<span className={styles.message}>{message}</span>
				<div className={cls(styles.todoWrapper, isOpenClass, isHotCloseClass)}>
					<Todo
						todoList={filteredTodoList}
						selectedTask={selectedTask}
						onOpenForm={handleClickOpenUpdateForm}
						onSelectTask={setSelectedTask}
						onOpenDeleteForm={handleClickOpenDeleteForm}
						onCompletedTask={handleClickIsCompletedTask}
						onOpenFilterForm={handleClickOpenFilterForm}
					/>
					{isOpenForm.dom && (
						<FormUpdateTodo
							isAdd={isOpenForm.isAdd}
							selectedTask={selectedTask}
							onSubmit={handleClickUpdateTodo}
							onClose={handleClickCloseUpdateForm}
						/>
					)}
				</div>
			</div>

			{isOpenDeleteForm && (
				<ModalUI onClose={handleClickCloseDeleteForm}>
					<div className={styles.deleteModalForm}>
						<h3>Вы действительно хотите удалить выбранную задачу?</h3>
						<div className={styles.modalBtns}>
							<ButtonUI onClick={handleClickDeleteTask}>Да</ButtonUI>
							<ButtonUI onClick={handleClickCloseDeleteForm}>Нет</ButtonUI>
						</div>
					</div>
				</ModalUI>
			)}

			{isOpenFilterForm && (
				<ModalUI onClose={handleClickCloseFilterForm}>
					<FormFilterTodo onAccept={handleClickAcceptFilter} acceptedFilters={acceptedFilter} />
				</ModalUI>
			)}
		</main>
	);
};
