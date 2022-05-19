const yourPaths = require('./your_paths');
const { spawnSync } = require('child_process');

const FFmpeg = (task) => {
    console.log(task)
    const inputFile = yourPaths.inputFolder + '\\' + task.filename;
    const outputFile = yourPaths.outputFolder + '\\' + task.outputFileName;

    const basicArgs = [
        '-ss', (task.startPosition).toString(),
        '-i', inputFile,
        '-t', (task.duration).toString(),
        ... (task.qmin !== 'undefined') ? ['-qmin', (task.qmin).toString()] : [],
        ... (task.qmax !== 'undefined') ? ['-qmax', (task.qmax).toString()] : [],
        ... (task.qcomp !== 'undefined') ? ['-qcomp', (task.qcomp).toString()] : [],
        ... (task.crf !== 'undefined') ? ['-crf', (task.crf).toString()] : [],
        ... (task.deadline !== 'undefined') ? ['-deadline', task.deadline] : [],
        ... (task.vCodec !== 'undefined') ? ['-c:v', task.vCodec] : [],
        ... (task.aCodec !== 'undefined') ? ['-c:a', task.aCodec] : [],
        ... (task.audioQuality !== 'undefined') ? ['-q:a', (task.audioQuality).toString()] : [],
        ... (task.threads !== 'undefined') ? ['-threads', (task.threads).toString()] : [],
        ... (task.cpuUsed !== 'undefined') ? ['-cpu-used', (task.cpuUsed).toString()] : [],
    ]
    const runFFmpeg = (args) => {
        const result = spawnSync('ffmpeg', args, { stdio: 'inherit', encoding: 'utf8' });
        console.log(result);
    }
    if (task.pass) {
        let doublePassArgs = [];
        for (i = 1; i <= 2; i++) {
            doublePassArgs = [...basicArgs, '-pass', (i).toString(), outputFile];
            runFFmpeg(doublePassArgs);
        }

    } else {
        const singlePassArgs = [...basicArgs, outputFile];
        runFFmpeg(singlePassArgs);
    }
    
}

module.exports = { FFmpeg };

