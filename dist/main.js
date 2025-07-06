"use strict";
// src/main.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./distributor/index");
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const distributor = new index_1.Distributor({
    retryAttempts: 3,
    timeout: 5000,
});
function initialize() {
    console.log('Data distribution system initialized.');
}
// Utility to ensure a folder exists
function ensureFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}
// Utility to remove a file if it exists
function removeFileIfExists(filePath) {
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
            }
            else {
                console.log('File transferred successfully!');
            }
            rl.close();
        });
    }
    else {
        console.log('No action taken.');
        rl.close();
    }
});
