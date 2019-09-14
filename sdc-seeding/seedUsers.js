const faker = require('faker');
const fs = require('fs');
const writeUsers = fs.createWriteStream('data_users.csv');


(async () => {
  for (var i = 0; i < 10000000; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    const username = faker.internet.userName();
    const color = faker.internet.color();
    const location = faker.address.city();
    const vip = (Math.random() * 2 > .5 ? false : true);
    // console.log(`${username},${color},${location},${vip}`);
    if (!writeUsers.write(`${username},"${color}",${location},${vip}\n`)) {
      await new Promise(resolve => {
        writeUsers.once('drain', resolve);
      });
    }
  }
})()