const file = require('./file');
const yourPaths = require('./your_paths');
const winston = require('winston');

const consoleTransport = new winston.transports.Console();
consoleTransport.level = 'error';
winston.add(consoleTransport);

const Existence = (tasks) => {

    const ifTasksNotEmpty = () => {
        if(Object.keys(tasks).length === 0) {
            return false;
        } else {
            return true;
        }
    };

    const checkFileExistence = (fileName) => {
        return file.ifFileExists(yourPaths.inputFolder, fileName)
    };

    const checkFilesExistence = () => {
        let count = 0;
        const totalTasks = Object.keys(tasks).length;
        Object.entries(tasks).forEach(([key, val]) => {
            if (checkFileExistence(val.filename)) {
                winston.info(`existence.js: ${val.filename} does exist!`)
                count++;
            } else {
                winston.error(`existence.js: Are you sure ${val.filename} exists?`)
            }
        });
        if (count === totalTasks) {
            winston.info('existence.js: I managed to find all original files!');
            return true;
        } else {
            winston.error('existence.js: Some files are missing');
            return false;
        }
    };

    if (ifTasksNotEmpty()) {
        return checkFilesExistence();
    } else {
        winston.error('existence.js: Tasks object is empty')
        return false;
    }
};

module.exports = { Existence };