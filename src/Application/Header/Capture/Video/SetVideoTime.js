import React, { useState, useEffect } from 'react';
import './SetVideoTime.css';

const SetVideoTime = (props) => {

	const videoElement = props.videoElement;
	const firstSliderStep = props.firstSliderStep;
	const secondSliderStep = props.secondSliderStep;
	const duration = props.duration;

	const [currentTime, setCurrentTime] = useState(0);
	const [secondSliderValue, setSecondSlider] = useState(0.5);

	useEffect(() => {
		if (videoElement != undefined) {
			const setvideotime = localStorage.getItem('setvideotime');
			if (setvideotime != null) {
				const setvideotimeObject = JSON.parse(setvideotime);
				setCurrentTime(setvideotimeObject.f_currentTime);
				videoElement.currentTime = setvideotimeObject.f_currentTime;
			};

			videoElement.ontimeupdate = () => {
				setCurrentTime(videoElement.currentTime);
				localStorage.setItem('setvideotime', JSON.stringify({f_currentTime: videoElement.currentTime}));
			};
		};
	}, [props.duration]);

	const firstSlider = (e) => {
		const value = parseFloat(e.target.value);
		setCurrentTime(value);
		videoElement.currentTime = value;
	};
	const secondSlider = (e) => {
		const value = parseFloat(e.target.value);
		if (videoElement.currentTime == 0 && value < 0.5) return;
    setSecondSlider(parseFloat(value));
    if (secondSliderValue < value) { setCurrentTime(prevTime => prevTime + secondSliderStep); videoElement.currentTime += secondSliderStep; };
    if (secondSliderValue > value) { setCurrentTime(prevTime => prevTime - secondSliderStep); videoElement.currentTime -= secondSliderStep; };
   };

   if (videoElement != undefined) {
    return (
		<div className="setPositions">
			<div className="currentTime">
				<label htmlFor="currentTime">Current time: </label>
				<input type="text" id="currentTime" value={currentTime} onChange={firstSlider} />
			</div>
		  <div className="firstSlider">
				<label htmlFor="firstSlider">-+{firstSliderStep}: 0{'⇄'}{duration} (Click on me then use keyboard arrows ⇐ ⇒ for better accuracy)</label>
				<input type="range" id="firstSlider" min="0" max={duration} step={firstSliderStep} value={currentTime} onChange={firstSlider}/>
			</div>
			<div className="secondSlider">
					<label htmlFor="secondSlider">-+{secondSliderStep}: 0{'⇄'}1</label>
					<input type="range" id="secondSlider" min="0" max="1" step={secondSliderStep} value={secondSliderValue} onChange={secondSlider} />
			</div>
		</div>
		        )
	 };
};

export default SetVideoTime;

