import React, { useState, useEffect, useRef } from 'react';
import './MakePositions.css';

const MakePositions = (props) => {

	const videoElement = props.videoElement;
	const duration = props.duration;

	const [startPosition, setStartPosition] = useState(0);
	const [endPosition, setEndPosition] = useState(0);
	const [lockString, setLockString] = useState('');

	useEffect(() => {
		const makepositions = localStorage.getItem('makepositions');
		if (makepositions != null) {
			const makepositionsObject = JSON.parse(makepositions);
			setStartPosition(makepositionsObject.f_startPosition);
			setEndPosition(makepositionsObject.f_endPosition);
		};
	}, []);

	useEffect(() => {
		const makepositions = localStorage.getItem('makepositions');
		if (makepositions == null) {
			setStartPosition(0);
			setEndPosition(0);
			setLockString('');
		};
	}, [duration]);

	const setPosition = (e) => {
		if (e.target.id == "startPosition") {
			setStartPosition(videoElement.currentTime);
		};
		if (e.target.id == "endPosition") {
			setEndPosition(videoElement.currentTime);
		};
	};

	const lock = () => {
		if (startPosition > endPosition || startPosition == endPosition || startPosition > duration || endPosition > duration) {
			setLockString("Whoops! Wrong Positions, can't lock with these positions");
		} else {
			setLockString("Locked successfully!");
			localStorage.setItem('makepositions', JSON.stringify({f_startPosition: startPosition, f_endPosition: endPosition}));
		};

	};

	if (videoElement != undefined) {
		return (
		<div className="makePositions">
			<label htmlFor="startPosition">Start: {startPosition}  </label>
			<label htmlFor="endPosition">End: {endPosition}  </label>
			<label htmlFor="lock">State: {lockString}</label>
			<button id="startPosition" type="button" onClick={setPosition}>Start time</button>
			<button id="endPosition" type="button" onClick={setPosition}>End time</button>
			<button id="lock" type="button" onClick={lock}>Lock</button>
		</div>
	         );
	}
};
export default MakePositions;
