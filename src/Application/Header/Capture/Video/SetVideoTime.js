import React, { useState, useEffect, useLayoutEffect } from 'react';

const SetVideoTime = (props) => {

	const videoElement = props.videoElement;
	const firstSliderStep = props.firstSliderStep;
	const secondSliderStep = props.secondSliderStep;
	const duration = props.duration;

	const [currentTime, setCurrentTime] = useState(0);
	const [secondSliderValue, setSecondSlider] = useState(0.5);

/*	useLayoutEffect(() => {
		if (videoElement != undefined) {
			const setvideotime = localStorage.getItem('setvideotime');
			if (setvideotime != null) {
				const setvideotimeObject = JSON.parse(setvideotime);
				console.log(setvideotimeObject);
			};
		};
	}, []); */

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
		setSecondSlider(0.5);
	}, [props.duration]);

	const sliderWidth = {
		width: '70vw',
	};

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
		<div>
			<h2>Current time: {currentTime}</h2>
			<label htmlFor="currTime">Current time: </label>
			<input type="text" id="currTime" value={currentTime} onChange={firstSlider} />
				<div>
					<label htmlFor="firstSlider">-+{firstSliderStep} between 0 and {duration}</label>
					<input style={sliderWidth} type="range" id="firstSlider" min="0" max={duration} step={firstSliderStep} value={currentTime} onChange={firstSlider}/>
				</div>
					<div>
						<label htmlFor="secondSlider">-+{secondSliderStep} between 0 and 1</label>
						<input style={sliderWidth} type="range" id="secondSlider" min="0" max="1" step={secondSliderStep} value={secondSliderValue} onChange={secondSlider} />
					</div>
			</div>
		        )
	 };
};

export default SetVideoTime;

