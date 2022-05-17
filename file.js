const fs = require('fs');
const path = require('path')

const createOutputFolder = (outputFolder) => {
    try {
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }
    } catch (err) {
        console.error(err);
    }
}

const ifFileExists = (inputFolder, fileName) => {
    try {
        if (fs.existsSync(path.join(inputFolder, fileName))) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.error(err)
    }
}

module.exports = { createOutputFolder, ifFileExists };
