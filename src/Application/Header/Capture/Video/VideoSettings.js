import React, { useState, useEffect } from 'react';
import SetVideoTime from './SetVideoTime';
import MakePositions from './MakePositions';

const VideoSettings = (props) => {

	const [duration, setDuration] = useState(0);

	const videoElement = props.videoRef.current;

	if (videoElement != undefined ) {
		videoElement.onloadedmetadata = () => setDuration(videoElement.duration); 
	}

	const showFileName = () => {
		if (props.fileName != '') {
			return (
				<div>
					<h1>Filename: {props.fileName}</h1>
				</div>
			)
		};
	};

 	const showVideoDuration = () => {
		if (videoElement != undefined) {
			return (
				<>
					<h2>Duration: {duration}</h2>
				</>
			       )
		};
	};

	return (
		<div id="videoSettings-container">
			{showFileName()}
			{showVideoDuration()}
			<MakePositions videoElement={videoElement} />
			<SetVideoTime videoElement={videoElement} firstSliderStep={0.04166} secondSliderStep={0.01} duration={duration} />
		</div>
	       );
};

export default VideoSettings;
