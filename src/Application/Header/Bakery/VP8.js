import React, { useState, useEffect } from 'react';
import FFmpegLinePreview from './FFmpegLinePreview';

const VP8 = (props) => {
	
	const defaultValues = {
		qmin: 0, qmax: 40, qcomp: 0.6, crf: 10, deadline: 'best', vCodec: 'libvpx', aCodec: 'libvorbis',
		audioQuality: 3, threads: 1, cpuUsed: 0, pass: true,
	};

	const [options, setOptions] = useState({...props.options, ...defaultValues });

	useEffect(() => {
		const defaultOutputFileName = getDefaultOutputFilename();
		setOptions(prevOptions => {
			return {...prevOptions, outputFileName: defaultOutputFileName}
		});
		getOptionsFromStorage();
	}, []);

	useEffect(() => {
		localStorage.setItem('bakery', JSON.stringify({options}));
	}, [options]);

	const getOptionsFromStorage = () => {
		const bakery = localStorage.getItem('bakery');
		if (bakery != null) {
			let bakeryObject = JSON.parse(bakery);
			if (bakeryObject.options.filename !== props.options.filename 
				|| bakeryObject.options.duration !== props.options.duration 
				|| bakeryObject.options.startPosition !== props.options.startPosition) { //If capture options were changed, rewrite them in bakery
				const defaultOutputFileName = getDefaultOutputFilename();
				bakeryObject.options = {...bakeryObject.options, ...props.options, outputFileName: defaultOutputFileName} 
			};
			setOptions(prevOptions => {
				return {...prevOptions, ...bakeryObject.options}
			});
		};
	};

	const getDefaultOutputFilename = () => {
		if (options.filename != undefined) {
			const unixTimestampSeconds = Math.floor(Date.now() / 1000);
			const separatedByExtension = (options.filename).split(/.([0-9a-z]+)(?:[\?#]|$)/);
			return separatedByExtension[0] + '-' + unixTimestampSeconds.toString() + '.' + separatedByExtension[1]; 
		} else {
			return 'output.webm'
		};
	};

	
	const handleOutputFilename = (e) => {
		setOptions(prevOptions => {
			return {...prevOptions, outputFileName: e.target.value}
		});
	};

	const commonHandler = (e) => {
		const value = parseInt(e.target.value);
		if (value <= 63) {
			if (e.target.id === "qmin" && value < options.qmax) {
				setOptions(prevOptions => {
					return {...prevOptions, qmin: value} 
				});
			};
			if (e.target.id === "qmax" && value > options.qmin) {
				setOptions(prevOptions => {
					return {...prevOptions, qmax: value}
				});
			};
			if (e.target.id === "crf" && value >= 4 && value >= options.qmin && value <= options.qmax) {
				setOptions(prevOptions => {
					return {...prevOptions, crf: value}
				});
			};
		};
		if (e.target.id === "threads") {
			setOptions(prevOptions => {
				return {...prevOptions, threads: value}
			});
		};
		if (e.target.id === "cpuUsed" && value <= 2) {
			setOptions(prevOptions => {
				return {...prevOptions, cpuUsed: value}
			});
		};
	};

	const handleQcomp = (e) => {
		const value = parseFloat(e.target.value);
		if (value <= 1) {
			setOptions(prevOptions => {
				return {...prevOptions, qcomp: value}
			});
		};
	};

	const handleDeadline = (e) => {
		let value = e.target.value;
		if (value === 'undefined') value = undefined;
		setOptions(prevOptions => {
			return {...prevOptions, deadline: value}
		});
	};
	
	const handleVorbisQuality = (e) => {
		const value = parseFloat(e.target.value);
		if (value >=0 && value <= 10) {
			setOptions(prevOptions => {
				return {...prevOptions, audioQuality: value} 
			});
		};
	};

	const handlePass = (e) => {
		const value = !options.pass;
		e.target.checked = value;
		setOptions(prevOptions => {
			return {...prevOptions, pass: value}
		});
	};

	const handleToggle = (e) => {
		const id = e.target.previousElementSibling.childNodes[1].id

		if(options[id] !== undefined) {
			setOptions(prevOptions => {
				return {...prevOptions, [id]: undefined}
			});
		} else {
			setOptions(prevOptions => {
				return {...prevOptions, [id]: defaultValues[id]}
			});
		} 
	};

	const addTask = () => {
		const checkInputs =  () => {
			if (options.duration === 0) return false;
			if (options.filename === undefined) return false;
			if (options.outputFileName === undefined 
				|| options.outputFileName === '' ) return false;
			return true;
		};
		if (checkInputs()) {
			let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
			const unixTimestamp = Date.now();
			tasks.push({...options, id: unixTimestamp.toString()});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		};
	};

	return (
		<>
			<FFmpegLinePreview options={options} />
			<form >
				<fieldset>
					<legend>VP8:</legend>
					<label htmlFor="ss">-ss </label>
					<input id="ss" type="text" value={options.startPosition} disabled/>
					<label htmlFor="t">-t </label>
					<input id="t" type="text" value={options.duration} disabled/>
					<label htmlFor="inputFilename">Input Filename: </label>
					<input id="inputFilename" type="text" value={options.filename} disabled/>
					<label htmlFor="outputFilename">Output Filename: </label>
					<input id="outputFilename" type="text" value={options.outputFileName} onChange={handleOutputFilename}/>
					<div>
						<div>
							<label htmlFor="qmin">qmin </label>
							<input type="number" id="qmin" min="0" max="63" value={options.qmin} onChange={commonHandler}/>
						</div>
						<input type="checkbox" checked={(options.qmin != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="qmax">qmax </label>
							<input type="number" id="qmax" min="0" max="63" step="3" value={options.qmax} onChange={commonHandler}/>
						</div>
						<input type="checkbox" checked={(options.qmax != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="qcomp">qcomp </label>
							<input type="number" id="qcomp" min="0" max="1" step=".1" value={options.qcomp} onChange={handleQcomp}/>
						</div>
						<input type="checkbox" checked={(options.qcomp != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="crf">crf </label>
							<input type="number" id="crf" min="4" max="63" step="1" value={options.crf} onChange={commonHandler}/>
						</div>
						<input type="checkbox" checked={(options.crf != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="deadline">deadline </label>
							<select id="deadline" name="deadline" value={(options.deadline) ? options.deadline : 'undefined'} onChange={handleDeadline}>
								<option value="best">best</option>
								<option value="good">good</option>
								<option value="realtime">realtime</option>
								<option value="undefined">undefined</option>
							</select>
						</div>
						<input type="checkbox" checked={(options.deadline != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="qa">qa </label>
							<input type="number" id="audioQuality" min="0" max="10" step=".5" value={options.audioQuality} onChange={handleVorbisQuality} />
						</div>
						<input type="checkbox" checked={(options.audioQuality != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="threads">threads </label>
							<input type="number" id="threads" min="0" step="1" value={options.threads} onChange={commonHandler}/>
						</div>
						<input type="checkbox" checked={(options.threads != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<div>
						<div>
							<label htmlFor="cpuUsed">cpu_used </label>
							<input type="number" id="cpuUsed" min="0" max="2" step="1" value={options.cpuUsed} onChange={commonHandler}/>
						</div>
						<input type="checkbox" checked={(options.cpuUsed != undefined) ? true : false} onChange={handleToggle} />
					</div>
					<label htmlFor="pass">double pass: </label>
					<input type="checkbox" id="pass" checked={options.pass} onChange={handlePass} />
					<button type="button" id="addTask" onClick={addTask}>Add to Tasks</button>
				</fieldset>
			</form>
		</>
	       );
};

export default VP8;
