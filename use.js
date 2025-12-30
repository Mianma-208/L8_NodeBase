const stringSorter = require('./custom/string-sorter');
const dataLoader = require('./custom/data-loader');
const fs = require('./custom/file-system');

async function main() {
    console.log('1. Загрузка пользователей...');
    const usersResult = await dataLoader.loadUsers();
    if (usersResult.error) {
        console.error('Ошибка загрузки:', usersResult.error);
        return;
    }
    const userNames = usersResult.data.map(user => user.name);
    const sortedNames = stringSorter.sortStrings(userNames);
    fs.createFolderSync('./users');
    const namesContent = sortedNames.join('\n');
    fs.writeFileSync('./users/names.txt', namesContent);
    console.log('   ✅ Файл names.txt создан');
    const emailsContent = usersResult.data.map(user => user.email).join('\n');
    fs.writeFileSync('./users/emails.txt', emailsContent);
    console.log('   ✅ Файл emails.txt создан');
}
main().catch(error => {
    console.error('Ошибка:', error);
});