import React, { useEffect, useRef, forwardRef } from 'react';

const VideoNode = forwardRef((props, ref) => {

	const fileObject = props.fileObject;

	useEffect(() => {
		ref.current?.load();
	}, [props.fileObject]);

	let videoNodeVisibility = {
		visibility: 'visible',
	};

	if (fileObject.url == undefined) { videoNodeVisibility = { visibility: 'hidden', } }; 

	return (
		<video ref={ref} style={videoNodeVisibility} id="videoContent" controls>
			<source src={fileObject.url} type={fileObject.type} />
		</video>
	)
})

export default VideoNode;
