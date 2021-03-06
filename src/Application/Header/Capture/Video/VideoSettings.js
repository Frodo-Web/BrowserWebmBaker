import React, { useState, useEffect } from 'react';
import SetVideoTime from './SetVideoTime';
import MakePositions from './MakePositions';
import './VideoSettings.css';

const VideoSettings = (props) => {

	const fileObject = props.fileObject;

	const [duration, setDuration] = useState(0);

	const videoElement = props.videoRef.current;

	if (videoElement != undefined ) {
		videoElement.ondurationchange = () => setDuration(videoElement.duration); 
	};

	const showFileName = () => {
		if (fileObject.name != undefined) {
			return (
				<div id="filename">
					Filename: {fileObject.name}
				</div>
			)
		};
	};

 	const showVideoDuration = () => {
		if (videoElement != undefined) {
			return (
				<div id="duration">
					Duration: {duration}
				</div>
			       )
		};
	};

	return (
		<div className="videoSettings">
			{showFileName()}
			{showVideoDuration()}
			<MakePositions videoElement={videoElement} duration={duration} />
			<SetVideoTime videoElement={videoElement} firstSliderStep={0.04166} secondSliderStep={0.01} duration={duration} />
		</div>
	       );
};

export default VideoSettings;
