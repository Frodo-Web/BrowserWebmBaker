import React from 'react';

const FFmpegLinePreview = (props) => {

	const options = props.options;

	return (
		<h2>
			 ffmpeg -ss {options.startPosition} -i {options.filename} -t {options.duration} 
			 -qmin {options.qmin} -qmax {options.qmax} -qcomp {options.qcomp} 
			 -crf {options.crf} -deadline {options.deadline} -c:v {options.vCodec} 
	     -c:a {options.aCodec} -q:a {options.audioQuality} -threads {options.threads} 
			-cpu-used {options.cpuUsed} -pass {(options.pass) ? 'double' : 'single'} -o {options.outputFileName}
		</h2>
	       );
};

export default FFmpegLinePreview;
