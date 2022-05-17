import React from 'react';

const Task = (props) => {

	const task = props.task;

	const printTask = () => {
		if (task?.outputFileName) {
			return (
				<span>{task.outputFileName}</span>
			       )
		};
	};

	return (
		<>
			{printTask()}
		</>
	       );
};

export default Task;

