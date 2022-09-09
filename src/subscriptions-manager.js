import fs from 'fs';

import {FileNames} from './constants/file-names.js';
import {States} from './constants/states.js';

const SUBSCRIBERS_FILE_NAME = States.testIsRunning ? 'test.json' : FileNames.subscribers;

function getAllSubscribers(fileName = SUBSCRIBERS_FILE_NAME) {
    try {
        let allSubscribers = fs.readFileSync(fileName, 'utf-8');

        if (typeof allSubscribers === 'undefined'){
            allSubscribers = [];
        }

        return JSON.parse(allSubscribers);
    } catch(err) {

        return [];
    }
}

function writeSubscribersToFile(subscribers, fileName = SUBSCRIBERS_FILE_NAME) {
    const stringifiedSubscribers = JSON.stringify(subscribers);
    try {
        fs.writeFileSync(fileName, stringifiedSubscribers);

        return true;
    } catch(err) {
        console.log(`Failed to save subscription to a file ${fileName}. ${err}`);

        return false
    }
}

function addSubscriber(emailToAdd, fileName = SUBSCRIBERS_FILE_NAME) {
    const subscribers = getAllSubscribers(fileName);

    subscribers.push(emailToAdd);

    return writeSubscribersToFile(subscribers, fileName);
}

function removeSubscriber(emailToDelete, fileName = SUBSCRIBERS_FILE_NAME) {
    const subscribers = getAllSubscribers(fileName);

    const updatedSubscribers = subscribers.filter((value) => {
        return value.toString() !== emailToDelete;
    });

    return writeSubscribersToFile(updatedSubscribers, fileName);
}

function subscriberExists(email) {
    return getAllSubscribers().includes(email.toString());
}

function deleteFileWithSubscribers(fileName = SUBSCRIBERS_FILE_NAME) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.log("Failed to delete file.")
        }

        console.log("File is deleted.");
    });
}

export {addSubscriber, getAllSubscribers, removeSubscriber, subscriberExists, deleteFileWithSubscribers}