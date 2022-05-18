import React from 'react';

const FFmpegLinePreview = (props) => {

	const options = props.options;

	return (
		<h2>
			 ffmpeg -ss {options.startPosition} -i {options.filename} -t {options.duration} 
			 {(options.qmin != undefined) ? ` -qmin: ${options.qmin}` : ''} 
			 {(options.qmax != undefined) ? ` -qmax: ${options.qmax}` : ''} 
			 {(options.qcomp != undefined) ? ` -qcomp: ${options.qcomp}` : ''}
			 {(options.crf != undefined) ? ` -crf: ${options.crf}` : ''}
			 {(options.deadline != undefined) ? ` -deadline: ${options.deadline}` : ''}
			 {(options.vCodec != undefined) ? ` -c:v: ${options.vCodec}` : ''}
			 {(options.aCodec != undefined) ? ` -c:a: ${options.aCodec}` : ''} 
			 {(options.audioQuality != undefined) ? ` -q:a: ${options.audioQuality}` : ''} 
			 {(options.threads != undefined) ? ` -threads: ${options.threads}` : ''}
			 {(options.cpuUsed != undefined) ? ` -cpu-used: ${options.cpuUsed}` : ''} 
			{' -pass'} {(options.pass) ? ' double ' : ' single '}
			 {options.outputFileName}
		</h2>
	       );
};

export default FFmpegLinePreview;
