import React, { useState, useEffect } from 'react';
import VP8 from './VP8';
import VP9 from './VP9';

const FFmpegSettings = () => {

	const [codec, setCodec] = useState(<h2>Choose your codec</h2>);

	useEffect(() => {
		const bakery = getStorage('bakery');
		if (bakery?.options?.vCodec === 'libvpx') {
			setCodec(<VP8 options={parseVP8()} />);
		}
	}, []);

	const getStorage = (key) => {
		const data = localStorage.getItem(key);
		if (data !== null) {
			const dataObject = JSON.parse(data);
			return dataObject;
		};
		return null;
	};

	const parseVP8 = () => {
		let vp8Options = {};
		const capture = getStorage('capture');
		if (capture !== null) {
			vp8Options = {...vp8Options, filename: capture.f_name}
		}
		const positions = getStorage('makepositions');
		if (positions !== null) {
			const t = Math.floor((positions.f_endPosition - positions.f_startPosition) * 10000) / 10000;
			vp8Options = {...vp8Options, startPosition: positions.f_startPosition, endPosition: positions.f_endPosition, duration: t}
		} else {
			vp8Options = {...vp8Options, startPosition: 0, endPosition: 0, duration: 0}
		}
		return vp8Options;
	};

	const vp8 = () => setCodec(<VP8 options={parseVP8()} />);
	const vp9 = () => setCodec(<VP9 options={{empty: "empty"}} />); 

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
