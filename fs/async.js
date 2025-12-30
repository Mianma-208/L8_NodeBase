const fs = require('fs').promises;
const path = require('path');

const allowedExtensions = ['.txt', '.json', '.rtf'];

function isValidFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return allowedExtensions.includes(ext);
}

async function writeFileAsync(filePath, data) {
    if (!isValidFile(filePath)) {
        throw new Error(`Неподдерживаемое расширение файла: ${path.extname(filePath)}`);
    }
    await fs.writeFile(filePath, data, 'utf8');
    console.log(`Файл ${filePath} записан`);
}

async function readFileAsync(filePath) {
    if (!isValidFile(filePath)) {
        throw new Error(`Неподдерживаемое расширение файла: ${path.extname(filePath)}`);
    }
    try {
        await fs.access(filePath);
    } catch {
        throw new Error(`Файл не существует: ${filePath}`);
    }
    return await fs.readFile(filePath, 'utf8');
}

async function updateFileAsync(filePath, newData) {
    await writeFileAsync(filePath, newData);
    console.log(`Файл ${filePath} обновлен`);
}

async function clearFileAsync(filePath) {
    await writeFileAsync(filePath, '');
    console.log(`Файл ${filePath} очищен`);
}

async function cleanFileAsync(filePath) {
    const content = await readFileAsync(filePath);
    
    let cleaned = content.replace(/\d/g, '');
    cleaned = cleaned.toLowerCase();
    
    await writeFileAsync(filePath, cleaned);
    console.log(`Файл ${filePath} очищен от шума`);
}

async function copyFileAsync(sourcePath, destPath) {
    if (!isValidFile(sourcePath) || !isValidFile(destPath)) {
        throw new Error('Неподдерживаемое расширение файла');
    }
    
    const content = await readFileAsync(sourcePath);
    await writeFileAsync(destPath, content);
    console.log(`Файл скопирован из ${sourcePath} в ${destPath}`);
}

async function createFolderAsync(folderPath) {
    try {
        await fs.access(folderPath);
        console.log(`Папка уже существует: ${folderPath}`);
    } catch {
        await fs.mkdir(folderPath, { recursive: true });
        console.log(`Папка создана: ${folderPath}`);
    }
}

async function deleteFolderAsync(folderPath) {
    try {
        await fs.access(folderPath);
        
        const items = await fs.readdir(folderPath);
        
        for (const item of items) {
            const itemPath = path.join(folderPath, item);
            const stat = await fs.stat(itemPath);
            
            if (stat.isDirectory()) {
                await deleteFolderAsync(itemPath);
            } else {
                await fs.unlink(itemPath);
            }
        }
        
        await fs.rmdir(folderPath);
        console.log(`Папка удалена: ${folderPath}`);
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
}

async function getAllFilesAsync(rootPath = process.cwd()) {
    const result = [];
    
    async function scanDirectory(dirPath) {
        try {
            const items = await fs.readdir(dirPath);
            
            for (const item of items) {
                const fullPath = path.join(dirPath, item);
                
                if (item.startsWith('.') || item === 'node_modules') {
                    continue;
                }
                
                const stat = await fs.stat(fullPath);
                
                if (stat.isDirectory()) {
                    await scanDirectory(fullPath);
                } else if (stat.isFile() && isValidFile(fullPath)) {
                    result.push(fullPath);
                }
            }
        } catch (error) {
            console.error(`Ошибка при сканировании ${dirPath}:`, error.message);
        }
    }
    
    await scanDirectory(rootPath);
    return result;
}

async function cleanProjectAsync(rootPath = process.cwd()) {
    try {
        const items = await fs.readdir(rootPath);
        
        for (const item of items) {
            const fullPath = path.join(rootPath, item);
            
            if (item.startsWith('.') || item === 'node_modules' || 
                item === 'package.json' || item === 'package-lock.json') {;
                continue;
            }
            
            try {
                const stat = await fs.stat(fullPath);
                
                if (stat.isDirectory()) {
                    await deleteFolderAsync(fullPath);
                } else if (stat.isFile()) {
                    await fs.unlink(fullPath);
                    console.log(`Файл удален: ${item}`);
                }
            } catch (error) {
                console.error(`Ошибка при удалении ${item}:`, error.message);
            }
        }
        
        console.log('Проект очищен');
    } catch (error) {
        console.error('Ошибка при очистке проекта:', error.message);
    }
}

module.exports = {
    writeFileAsync,
    readFileAsync,
    updateFileAsync,
    clearFileAsync,
    cleanFileAsync,
    copyFileAsync,
    createFolderAsync,
    deleteFolderAsync,
    getAllFilesAsync,
    cleanProjectAsync
};