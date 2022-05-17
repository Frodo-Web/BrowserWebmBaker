import React, { useState, useEffect } from 'react';
import VP8 from './VP8';
import VP9 from './VP9';

const FFmpegSettings = () => {

	const [codec, setCodec] = useState(<h2>Choose your codec</h2>);
	const [options, setOptions] = useState({});

	useEffect(() => {
		getPositions();
		getCapture();
	}, []);

/*	useEffect(() => {
		console.log("getBakery()");
		getBakery();
	}, [options]); */

	const getStorage = (key) => {
		const data = localStorage.getItem(key);
		if (data != null) {
			const dataObject = JSON.parse(data);
			return dataObject;
		};
		return null;
	};

/*	const getBakery = () => {
		const bakery = getStorage('bakery');
		if (bakery != null) {
			console.log(options.filename);
			if (bakery.options.vCodec === 'libvpx') setCodec(<VP8 options={options} />);
			if (bakery.options.vCodec === 'libvpx-vp9') setCodec(<VP9 options={options} />);
		};
	}; */

	const getCapture = () => {
		const capture = getStorage('capture');
		if (capture != null) {
			setOptions(prevOptions => {
				return {...prevOptions, filename: capture.f_name}
			});
		};
	};

	const getPositions = () => {
		const positions = getStorage('makepositions');
		if (positions != null) {
			const t = Math.floor((positions.f_endPosition - positions.f_startPosition) * 10000) / 10000;
			setOptions(prevOptions => {
				return {...prevOptions, startPosition: positions.f_startPosition, endPosition: positions.f_endPosition, duration: t}
			});
		} else {
			setOptions(prevOptions => {
				return {...prevOptions, startPosition: 0, endPosition: 0, duration: 0}
			});
		};
	};

	const vp8 = () => setCodec(<VP8 options={options} />);
	const vp9 = () => setCodec(<VP9 options={options} />);

	return (
		<>
			<nav id="codec">
				<ul>
					<li><a onClick={vp8}>VP8</a></li>
					<li><a onClick={vp9}>VP9</a></li>
				</ul>
			</nav>
			{codec}
		</>
	       )
};

export default FFmpegSettings;
