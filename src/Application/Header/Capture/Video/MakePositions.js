import React, { useState } from 'react';

const MakePositions = (props) => {

	const videoElement = props.videoElement;

	const [startPosition, setStartPosition] = useState(0);
	const [endPosition, setEndPosition] = useState(0);
	const [cutString, setCutString] = useState('');

	const setPosition = (e) => {
		if (e.target.id == "startPosition") setStartPosition(videoElement.currentTime);
		if (e.target.id == "endPosition") setEndPosition(videoElement.currentTime);
	};

	const cut = () => {
		if (startPosition > endPosition || startPosition == endPosition) {
			setCutString("Whoops! Wrong Positions, can't cut with these positions");
		} else {
			setCutString("Cut successfully!");
		};

	};

	if (videoElement != undefined) {
		return (
		<div>
			<label htmlFor="startPosition">Start: {startPosition}  </label>
			<label htmlFor="endPosition">End: {endPosition}  </label>
			<label htmlFor="cut">State: {cutString}</label>
			<button id="startPosition" type="button" onClick={setPosition}>Start time</button>
			<button id="endPosition" type="button" onClick={setPosition}>End time</button>
			<button id="cut" type="button" onClick={cut}>Cut</button>
		</div>
	         );
	}
};
export default MakePositions;
