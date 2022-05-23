import React from 'react';
import './SelectFile.css';

const SelectFile = (props) => {
	return (
		<div className="selectFile">
			<label htmlFor="selectFile">Select a file: </label>
			<input id="selectFile" type="file" onChange={props.onFileSelect} />
		</div>
	       );
};

export default SelectFile;
