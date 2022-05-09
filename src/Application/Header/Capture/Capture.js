import React, { Component, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SelectFile from './SelectFile';
import getVideoURL from './getVideoURL';
import Video from './Video/Video';

const Capture = () => {
	const [fileURL, setURL] = useState('');
	const [fileType, setType] = useState('');
	const [fileName, setName] = useState('');

	useEffect(() => {
		const capture = localStorage.getItem('capture');
		if (capture != null) {
			const captureObject = JSON.parse(capture);
			setURL(captureObject.f_url);
			setType(captureObject.f_type);
			setName(captureObject.f_name);
		}; 
	}, []);
	
	const onSelect = (e) => {
		const fileObject = e.target.files[0];
		const fileObjectURL = getVideoURL(fileObject);
		setURL(fileObjectURL);
		setType(fileObject.type);
		setName(fileObject.name);
		localStorage.setItem('capture', JSON.stringify({f_name: fileObject.name, f_type: fileObject.type, f_url: fileObjectURL}));
	};

	return (
		<div id="timing-container">
		   <SelectFile onFileSelect={onSelect} />
		   <Video fileURL={fileURL} fileType={fileType} fileName={fileName} />
		</div>
         );
};

export default Capture;

