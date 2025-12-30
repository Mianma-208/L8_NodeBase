const fs = require('fs');
const path = require('path');

const extensions = ['.txt', '.json', '.rtf'];

function isValidFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return extensions.includes(ext);
}

function writeFileSync(filePath, data) {
    if (!isValidFile(filePath)) {
        throw new Error(`Неподдерживаемое расширение файла: ${path.extname(filePath)}`);
    }
    fs.writeFileSync(filePath, data, 'utf8');
    console.log(`Файл ${filePath} записан`);
}

function readFileSync(filePath) {
    if (!isValidFile(filePath)) {
        throw new Error(`Неподдерживаемое расширение файла: ${path.extname(filePath)}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Файл не существует: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

function updateFileSync(filePath, newData) {
    writeFileSync(filePath, newData);
    console.log(`Файл ${filePath} обновлен`);
}

function clearFileSync(filePath) {
    writeFileSync(filePath, '');
    console.log(`Файл ${filePath} очищен`);
}

function cleanFileSync(filePath) {
    const content = readFileSync(filePath);
    
    let cleaned = content.replace(/\d/g, '');
    cleaned = cleaned.toLowerCase();
    writeFileSync(filePath, cleaned);
    console.log(`Файл ${filePath} очищен от шума`);
}

function copyFileSync(firstPath, secondPath) {
    if (!isValidFile(firstPath) || !isValidFile(secondPath)) {
        throw new Error('Неподдерживаемое расширение файла');
    }
    
    const content = readFileSync(firstPath);
    writeFileSync(secondPath, content);
    console.log(`Файл скопирован из ${firstPath} в ${secondPath}`);
}

function createFolderSync(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Папка создана: ${folderPath}`);
    } else {
        console.log(`Папка уже существует: ${folderPath}`);
    }
}

function deleteFolderSync(folderPath) {
    if (fs.existsSync(folderPath)) {
        const items = fs.readdirSync(folderPath);
        items.forEach(item => {
            const itemPath = path.join(folderPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                deleteFolderSync(itemPath);
            } else {
                fs.unlinkSync(itemPath);
            }
        });
        fs.rmdirSync(folderPath);
        console.log(`Папка удалена: ${folderPath}`);
    }
}


function getAllFilesSync(rootPath = process.cwd()) {
    const result = [];
    
    function scanDirectory(dirPath) {
        const items = fs.readdirSync(dirPath);
        
        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (item.startsWith('.') || item === 'node_modules') {
                return;
            }
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (stat.isFile() && isValidFile(fullPath)) {
                result.push(fullPath);
            }
        });
    }
    scanDirectory(rootPath);
    return result;
}

function cleanProjectSync(rootPath = process.cwd()) {
    const items = fs.readdirSync(rootPath);
    
    items.forEach(item => {
        const fullPath = path.join(rootPath, item);
        if (item.startsWith('.') || item === 'node_modules' || 
            item === 'package.json' || item === 'package-lock.json') {
            return;
        }
        
        try {
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                deleteFolderSync(fullPath);
            } else if (stat.isFile()) {
                fs.unlinkSync(fullPath);
                console.log(`Файл удален: ${item}`);
            }
        } catch (error) {
            console.error(`Ошибка при удалении ${item}:`, error.message);
        }
    });
    console.log('Проект очищен');
}

module.exports = {
    writeFileSync,
    readFileSync,
    updateFileSync,
    clearFileSync,
    cleanFileSync,
    copyFileSync,
    createFolderSync,
    deleteFolderSync,
    getAllFilesSync,
    cleanProjectSync
};