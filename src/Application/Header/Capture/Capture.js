import React, { Component, useState, useEffect } from 'react';
import SelectFile from './SelectFile';
import getVideoURL from './getVideoURL';
import Video from './Video/Video';
import './Capture.css'

const Capture = () => {
	const [fileObject, setFileObject] = useState({});

	useEffect(() => {
		const capture = localStorage.getItem('capture');
		if (capture != null) {
			const captureObject = JSON.parse(capture);
			setFileObject({name: captureObject.f_name, type: captureObject.f_type, url: captureObject.f_url});
		}; 
	}, []);

	useEffect(() => {
		if (Object.keys(fileObject).length != 0) updateLocalStorage();
	}, [fileObject]);

	const updateLocalStorage = () => localStorage.setItem('capture', JSON.stringify({f_name: fileObject.name, f_type: fileObject.type, f_url: fileObject.url}));

	const updateFileObject = (fObject) => {
		const fObjectURL = getVideoURL(fObject);
		setFileObject({name: fObject.name, type: fObject.type, url: fObjectURL});
	};
	
	const onSelect = (e) => {
		localStorage.removeItem('makepositions');
		updateFileObject(e.target.files[0]);
	};

	return (
		<section id="capture">
		   <SelectFile onFileSelect={onSelect} />
			 <Video fileObject={fileObject} />
		</section>
         );
};

export default Capture;

