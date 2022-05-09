import React, { useEffect, useRef, forwardRef } from 'react';

const VideoNode = forwardRef((props, ref) => {

	useEffect(() => {
		ref.current?.load();
	}, [props]);

	let videoNodeVisibility = {
		visibility: 'visible',
	};

	if (props.fileURL == '') { videoNodeVisibility = { visibility: 'hidden', } }; 

	return (
		<video ref={ref} style={videoNodeVisibility} id="videoContent" controls>
			<source src={props.fileURL} type={props.fileType} />
		</video>
	)
})

export default VideoNode;
