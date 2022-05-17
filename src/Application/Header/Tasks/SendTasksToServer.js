import React from 'react';

const SendTasksToServer = (props) => {

	const tasks = JSON.stringify(props.tasks);

	return (
		<button type="button" onClick={sendTasks}>Process all</button>
	       );
};

export default SendTasksToServer;
