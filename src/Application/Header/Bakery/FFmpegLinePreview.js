import React from 'react';

const FFmpegLinePreview = (props) => {

	const options = props.options;

	return (
		<h2>
			 ffmpeg 
			 -ss {options.startPosition}
			 {(options.subsIndex !== 'undefined') ? ' -copyts' : ''} 
			 -i {options.filename} 
			 {(options.subsIndex !== 'undefined') ? ` -ss ${options.startPosition} ` : ''}
			-vf colormatrix=bt709:bt601{(options.subsIndex !== 'undefined') ? `,subtitles=${options.filename}:si=${options.subsIndex}` : ''}
			 {' -t'} {options.duration} 
			 {(options.qmin !== 'undefined') ? ` -qmin: ${options.qmin}` : ''} 
			 {(options.qmax !== 'undefined') ? ` -qmax: ${options.qmax}` : ''} 
			 {(options.qcomp !== 'undefined') ? ` -qcomp: ${options.qcomp}` : ''}
			 {(options.crf !== 'undefined') ? ` -crf: ${options.crf}` : ''}
			 {(options.deadline !== 'undefined') ? ` -deadline: ${options.deadline}` : ''}
			 {(options.vCodec !== 'undefined') ? ` -c:v: ${options.vCodec}` : ''}
			 {(options.vBitrate !== 'undefined') ? ` -b:v: ${options.vBitrate}` : ''}
			 {(options.aCodec !== 'undefined') ? ` -c:a: ${options.aCodec}` : ''}
			 {(options.aBitrate !== 'undefined') ? ` -b:a: ${options.aBitrate}` : ''}
			 {(options.audioQuality !== 'undefined') ? ` -q:a: ${options.audioQuality}` : ''} 
			 {(options.threads !== 'undefined') ? ` -threads: ${options.threads}` : ''}
			 {(options.cpuUsed !== 'undefined') ? ` -cpu-used: ${options.cpuUsed}` : ''} 
			{' -pass'} {(options.pass) ? ' double ' : ' single '}
			 {options.outputFileName}
		</h2>
	       );
};

export default FFmpegLinePreview;
