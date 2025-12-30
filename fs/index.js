const sync = require('./sync');
const async = require('./async');

function testSyncFunctions() {
    try {
        sync.createFolderSync('./test-sync');
        sync.writeFileSync('./test-sync/test.txt', 'Hello World');
        sync.cleanFileSync('./test-sync/test.txt');
        sync.copyFileSync('./test-sync/test.txt', './test-sync/copy.txt');
        const files = sync.getAllFilesSync('./test-sync');
        console.log(files);
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

async function testAsyncFunctions() {
    try {
        await async.createFolderAsync('./test-async');
        await async.writeFileAsync('./test-async/test.txt', 'Async Test 456! XYZ');
        const content = await async.readFileAsync('./test-async/test.txt');
        console.log('Содержимое файла:', content);
        await async.cleanFileAsync('./test-async/test.txt');
        const cleanedContent = await async.readFileAsync('./test-async/test.txt');
        console.log('После очистки:', cleanedContent);
        const files = await async.getAllFilesAsync('./test-async');
        console.log('Все файлы:', files);
        
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

async function runTests() {
    testSyncFunctions();
    await testAsyncFunctions();
}

module.exports = {
    sync,
    async,
    runTests
};
