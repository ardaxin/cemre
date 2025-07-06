// src/main.ts

import { Distributor } from './distributor/index';
import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';

const distributor = new Distributor({
    retryAttempts: 3,
    timeout: 5000,
});

function initialize() {
    console.log('Data distribution system initialized.');
}

// Utility to ensure a folder exists
function ensureFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

// Utility to remove a file if it exists
function removeFileIfExists(filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

// Start the application
initialize();

const folder1 = path.join(process.cwd(), 'folder1');
const folder2 = path.join(process.cwd(), 'folder2');
const file1 = path.join(folder1, 'HELLOOOOO');
const file2 = path.join(folder2, 'HELLOOOOO');

// Ensure folders exist
ensureFolder(folder1);
ensureFolder(folder2);

// Remove HELLOOOOO from both folders if exists
removeFileIfExists(file1);
removeFileIfExists(file2);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Type "transfer" to create and move HELLOOOOO from folder1 to folder2: ', (answer) => {
    if (answer.trim().toLowerCase() === 'transfer') {
        // Create HELLOOOOO in folder1
        fs.writeFileSync(file1, 'This is the HELLOOOOO file.');

        // Transfer HELLOOOOO from folder1 to folder2
        fs.copyFile(file1, file2, (err) => {
            if (err) {
                console.error('File transfer failed:', err);
            } else {
                console.log('File transferred successfully!');
            }
            rl.close();
        });
    } else {
        console.log('No action taken.');
        rl.close();
    }
});