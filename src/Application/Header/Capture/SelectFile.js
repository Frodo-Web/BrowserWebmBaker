import React from 'react';

const SelectFile = (props) => {
	return (
		<div id="selectFile-container">
			<label htmlFor="selectButton">Select a file: </label>
			<input id="selectButton" type="file" onChange={props.onFileSelect} />
		</div>
	       );
};

export default SelectFile;
