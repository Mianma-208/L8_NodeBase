const bcrypt = require('bcrypt');

async function testBcrypt() 
{
    const passwords = [
        'gmkdmkm4',
        'glmsmkd',
        '8hfns5xn',
        'lmvmfvuh7hbv',
        '5656cgxvfcs',
        'hdbfgg6dgb',
        '9ijrhf7h7',
        'o0kcnjncudhuc',
        '9i9fjudbdsh',
        '0o0ofknjchxk',
        '9ifjjhjhs',
        '0o03iejnd',
        '13245361'
    ];
    
    const r = 10;
    const results = [];

    for (let i = 0; i < passwords.length; i++)
    {
        const password = passwords[i];
        const startTime = Date.now();
        try {
            const hash = await bcrypt.hash(password, r);
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            
            results.push({
                password,
                time: timeTaken,
                hash: hash
            });
            
            console.log(`Пароль ${i + 1}: "${password}"`);
            console.log(`Время хеширования: ${timeTaken}ms`);
            
        } catch (error) {
            console.error(`Ошибка при хешировании "${password}":`, error.message);
        }
    }
}

await testBcrypt();

module.exports = {testBcrypt}; 