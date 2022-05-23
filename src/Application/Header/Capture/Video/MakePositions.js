import React, { useState, useEffect } from 'react';
import './MakePositions.css';

const MakePositions = (props) => {

	const videoElement = props.videoElement;
	const duration = props.duration;

	const [startPosition, setStartPosition] = useState(0);
	const [endPosition, setEndPosition] = useState(0);
	const [lockString, setLockString] = useState('');

	const lockStates = {success: 'Locked successfully!', whoops: "Whoops! Wrong Positions, can't lock with these positions"};

	useEffect(() => {
		const makepositions = localStorage.getItem('makepositions');
		if (makepositions != null) {
			const makepositionsObject = JSON.parse(makepositions);
			setStartPosition(makepositionsObject.f_startPosition);
			setEndPosition(makepositionsObject.f_endPosition);
			setLockString(makepositionsObject.f_lockString)
		};
	}, []);

	useEffect(() => {
		const makepositions = localStorage.getItem('makepositions');
		if (makepositions === null) {
			setStartPosition(0);
			setEndPosition(0);
			setLockString('');
		};
	}, [duration]);

	const setPosition = (e) => {
		if (localStorage.getItem('makepositions') !== null) {
			localStorage.removeItem('makepositions');
			setLockString('');
		}
		if (e.target.id == "startPosition") {
			setStartPosition(videoElement.currentTime);
		};
		if (e.target.id == "endPosition") {
			setEndPosition(videoElement.currentTime);
		};
	};

	const lockPositions = () => {
		if (startPosition > endPosition || startPosition == endPosition || startPosition > duration || endPosition > duration) {
			setLockString(lockStates.whoops);
		} else {
			setLockString(lockStates.success);
			localStorage.setItem('makepositions', JSON.stringify({f_startPosition: startPosition, f_endPosition: endPosition, f_lockString: lockStates.success}));
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

			<input id="inpLock" type="checkbox" checked={(lockString === lockStates.success) ? true : false} onChange={lockPositions}/>
			<label class="btn-lock" for="inpLock">
				<svg width="36" height="40" viewBox="0 0 36 40">
					<path class="lockb" d="M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203 6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569 21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z"></path>
					<path class="lock" d="M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21"></path>
					<path class="bling" d="M29 20L31 22"></path>
					<path class="bling" d="M31.5 15H34.5"></path>
					<path class="bling" d="M29 10L31 8"></path>
				</svg>
			</label>
		</div>
	         );
	}
};
export default MakePositions;
