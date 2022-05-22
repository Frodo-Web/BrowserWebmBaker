// Windows example
const WindowsAddSlashes = (fullPath) => {
    return (fullPath + '')
      .replace(/[\\]/g, '\\\\\\\\')
      .replace(/[:]/g, '\\\\$&')
      .replace(/["'\[\]\(\)]/g, '\\$&')
      .replace(/\u0000/g, '\\0')
};
const WindowsJoinFileToPath = (path, filename) => {
    return path + '\\' + filename;
};
//const inputFolder = 'C:\\Users\\cirno\\Downloads\\Content\\Webm'
const inputFolder = 'C:\\Users\\cirno\\Downloads'
const outputFolder = 'C:\\Users\\cirno\\Downloads\\Content\\Webm\\outputs'


module.exports = { inputFolder, outputFolder, WindowsAddSlashes, WindowsJoinFileToPath }