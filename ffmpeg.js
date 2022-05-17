const yourPaths = require('./your_paths');
const { spawnSync } = require('child_process');

const FFmpeg = (task) => {
    console.log(task)
    const args = [
        '-ss', (task.startPosition).toString(),
        '-i', yourPaths.inputFolder + '\\' + task.filename,
        '-t', (task.duration).toString(),
        '-qmin', (task.qmin).toString(),
        '-qmax', (task.qmax).toString(),
        '-qcomp', (task.qcomp).toString(),
        '-crf', (task.crf).toString(),
        '-deadline', task.deadline,
        '-c:v', task.vCodec,
        '-c:a', task.aCodec,
        '-q:a', (task.audioQuality).toString(),
        '-threads', (task.threads).toString(),
        '-cpu-used', (task.cpuUsed).toString(),
        yourPaths.outputFolder + '\\' + task.outputFileName,
    ]
    const runFFmpeg = () => {
        const result = spawnSync('ffmpeg', args, { stdio: 'inherit', encoding: 'utf8' });
        console.log(result);
    }
    runFFmpeg();
}

module.exports = { FFmpeg };

