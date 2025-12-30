require('dotenv').config({ path: './my.env' });

console.log('Имя:', process.env.NAME);
console.log('Фамилия:', process.env.SURNAME);
console.log('Группа:', process.env.NUMBER_GROUP);
console.log('Номер в группе:', process.env.NUMBER_IN_GROUP);