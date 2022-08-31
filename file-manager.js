import fs from 'fs';

function addToFile(textToAppend, fileName) {
    fs.appendFileSync(textToAppend, fileName);
}

function getFileContent(fileName) {
    const fileLines = fs.readFileSync(fileName, 'utf-8').split('\n');
    const lastFileLine = fileLines[fileLines.length - 1];
    const trimmedLastFileLine = lastFileLine.replace(' ', '');
    if (!trimmedLastFileLine) {
        fileLines.pop();
    }
    
    return fileLines;
}

export {addToFile, getFileContent}