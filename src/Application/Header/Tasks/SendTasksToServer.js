import React from 'react';

const SendTasksToServer = (props) => {

	const tasks = JSON.stringify(props.tasks);

	const sendTasks = () => {
		fetch('/processAll', {
			method: 'post',
			body: tasks,
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(function (response) {
			return response.text();
		}).then(function (text) {
			console.log(text);
		}).catch(function (error) {
			console.error(error);
		})
	};

	return (
		<button type="button" onClick={sendTasks}>Process all</button>
	       );
};

export default SendTasksToServer;
