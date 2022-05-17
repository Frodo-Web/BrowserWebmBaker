const ffmpeg = require('./ffmpeg');
const existence = require('./existence');

const Manager = (tasks) => {

    if (existence.Existence(tasks)) {
        Object.entries(tasks).forEach(([key, val]) => {
            ffmpeg.FFmpeg(val);
    });
    } else {
        return false;
    }
}

module.exports = { Manager };
