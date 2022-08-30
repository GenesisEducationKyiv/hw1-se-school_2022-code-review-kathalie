import fs from 'fs';

function addToFile(textToAppend, fileName) {
    fs.appendFileSync(textToAppend, fileName);
}

function getFileContent(fileName) {
    let fileContent = fs.readFileSync(fileName, 'utf-8').split('\n');
    if (fileContent[fileContent.length - 1].replace(" ", "") === '')
        fileContent.pop();
    return fileContent;
}

export {addToFile, getFileContent}