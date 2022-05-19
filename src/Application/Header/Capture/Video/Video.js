import React, { useState, useEffect, useRef } from 'react';
import VideoSettings from './VideoSettings';

const Video = (props) => {

	const fileObject = props.fileObject;
	const videoRef = useRef();

	useEffect(() => {
		videoRef.current?.load?.();
	}, [fileObject]);

	const isVisible = (videoRef.current == undefined) ? {visibility: 'hidden'} : {visibility: 'visible'}
    const videoNode =  
			<video ref={videoRef} id="video" style={isVisible} controls>
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
