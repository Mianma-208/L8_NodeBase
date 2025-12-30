const os=require('os');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

function showOSInfo()
{
    console.log('Платформа:', os.platform());
    console.log('Свободная память:', os.freemem(), 'в байтах');
    console.log('Главная директория:', os.homedir());
    console.log('Имя хоста:', os.hostname());
    console.log('Интерфейс сети:', os.networkInterfaces());
}

function checkMemory()
{
    if(os.freemem()>4294967296)
    {
        console.log('Памяти больше 4гб');
        return true;
    }
    console.log('Памяти меньше 4гб');
    return false;
}

function checkPrava()
{
    if(process.env.MODE==='admin') ShowInfo();
    else console.log('Доступ запрещён');
}

checkMemory();
checkPrava();