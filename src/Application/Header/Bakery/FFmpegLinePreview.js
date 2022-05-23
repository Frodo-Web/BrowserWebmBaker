import React from 'react';
import './FFmpegLinePreview.css';

const FFmpegLinePreview = (props) => {

	const options = props.options;

	return (
		<div id="ffmpegLinePreview">
			 ffmpeg 
			 {(options.startPosition !== undefined) ?  <><span> -ss</span> {options.startPosition}</> : <><span> -ss</span> 0</>}
			 {(options.subsIndex !== 'undefined') ? <span> -copyts</span> : ''} 
			 {(options.filename !== undefined) ?  <><span> -i</span> <span class="fileName">{options.filename}</span></> : <><span> -i</span> <span class="fileName">input.mp4</span></>} 
			 {(options.subsIndex !== 'undefined') ? <><span> -ss</span> {options.startPosition}</> : ''}
			 <span> -vf</span> colormatrix=bt709:bt601{(options.subsIndex !== 'undefined') ? `,subtitles=${options.filename}:si=${options.subsIndex}` : ''}
			 <span> -t</span> {options.duration} 
			 {(options.qmin !== 'undefined') ? <><span> -qmin</span> {options.qmin}</> : ''} 
			 {(options.qmax !== 'undefined') ? <><span> -qmax</span> {options.qmax}</> : ''} 
			 {(options.qcomp !== 'undefined') ? <><span> -qcomp</span> {options.qcomp}</> : ''}
			 {(options.crf !== 'undefined') ? <><span> -crf</span> {options.crf}</> : ''}
			 {(options.deadline !== 'undefined') ? <><span> -deadline</span> {options.deadline}</> : ''}
			 {(options.vCodec !== 'undefined') ? <><span> -c:v</span> {options.vCodec}</> : ''}
			 {(options.vBitrate !== 'undefined') ? <><span> -b:v</span> {options.vBitrate}</> : ''}
			 {(options.aCodec !== 'undefined') ? <><span> -c:a</span> {options.aCodec}</> : ''}
			 {(options.aBitrate !== 'undefined') ? <><span> -b:a</span> {options.aBitrate}</> : ''}
			 {(options.audioQuality !== 'undefined') ? <><span> -q:a</span> {options.audioQuality}</> : ''} 
			 {(options.threads !== 'undefined') ? <><span> -threads</span> {options.threads}</> : ''}
			 {(options.cpuUsed !== 'undefined') ? <><span> -cpu-used</span> {options.cpuUsed}</> : ''} 
			 <span> -pass</span> {(options.pass) ? ' 1..2 ' : ' single '}
			 <span class="fileName">{options.outputFileName}</span>
		</div>
	       );
};

export default FFmpegLinePreview;
