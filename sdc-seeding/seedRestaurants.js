const faker = require('faker');
const fs = require('fs');
const writeUsers = fs.createWriteStream('data_restaurants.csv');


(async () => {
  for (var i = 0; i < 10000000; i++) {
    if (i % 100000 === 0) {
      console.log(i);
    }
    const name = faker.company.companyName().replace(/,/, '\\,');
    // console.log(`${username},${color},${location},${vip}`);
    if (!writeUsers.write(`${name}\n`)) {
      await new Promise(resolve => {
        writeUsers.once('drain', resolve);
      });
    }
  }
})()