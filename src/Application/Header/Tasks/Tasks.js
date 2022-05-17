import React, { useState, useEffect } from 'react';
import Task from './Task';
import SendTasksToServer from './SendTasksToServer';

const Tasks = () => {

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setTasks(getTasks());
	}, []);

	const getTasks = () => {
		const tasksArray = JSON.parse(localStorage.getItem('tasks') || "[]");
		return tasksArray;
	};

	const deleteButton = (id) => {
		const deleteFromState = () => {
			const newState = tasks.filter((task) => task.id !== id);
			setTasks(newState);
		};
		const deleteFromStorage = () => {
			const currentTasks = getTasks();
			const updatedTasks = currentTasks.filter((task) => task.id !== id);
			localStorage.setItem('tasks', JSON.stringify(updatedTasks));
		};
		const deleteTask = () => {
			deleteFromState();
			deleteFromStorage();
		};
		return <button type="button" onClick={deleteTask}>Delete Task</button>
	};

	let listTasks = [];
	if (tasks.length !== 0) {
		listTasks = tasks.map((task) => {

			const deleteTask = deleteButton(task.id);

			return (
				<li id={task.id}>
					<Task task={task} />
					{deleteTask}	
				</li>
			       )
		});
	};
	return (
		<>
			<h2>Tasks: </h2>
			<SendTasksToServer tasks={tasks} />
			<ul>{listTasks}</ul>
		</>
	       );
};

export default Tasks;
