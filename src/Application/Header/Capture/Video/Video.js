import React, { useState, useEffect, useRef } from 'react';
import VideoNode from './VideoNode';
import VideoSettings from './VideoSettings';

const Video = (props) => {

	const videoRef = useRef();

	return (
		<div id="videoContent-container">
			<VideoNode ref={videoRef} fileURL={props.fileURL} fileType={props.fileType} />
			<VideoSettings videoRef={videoRef} fileName={props.fileName} />
		</div>
	       );
};

export default Video;
