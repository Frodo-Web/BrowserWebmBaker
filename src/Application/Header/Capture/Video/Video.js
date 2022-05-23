import React, { useState, useEffect, useRef } from 'react';
import VideoSettings from './VideoSettings';
import './Video.css';

const Video = (props) => {

	const [width, setWidth] = useState(800);

	const fileObject = props.fileObject;
	const videoRef = useRef();

	useEffect(() => {
		videoRef.current?.load?.();
	}, [fileObject]);

	const videoWheel = (e) => {
		if (e.deltaY > 0) {
			setWidth(prevWidth => prevWidth +=10 )
		} else {
			setWidth(prevWidth => prevWidth -=10)
		}
		console.log(e);	
	};

	const isVisible = (videoRef.current === undefined) ? {visibility: 'hidden'} : {visibility: 'visible'}
    const videoNode =  
			<video ref={videoRef} id="video" style={isVisible} width={width.toString()} onWheel={videoWheel} controls>
				<source src={fileObject.url} />
			</video>;
	return (
		<div className="video">
			{videoNode}
			<VideoSettings videoRef={videoRef} fileObject={fileObject} />
		</div>
	       );
};

export default Video;
