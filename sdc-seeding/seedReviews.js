const faker = require('faker');
const fs = require('fs');
const writeUsers = fs.createWriteStream('data_reviews.gz');

var zlib = require('zlib');
var compress = zlib.createGzip();
compress.pipe(writeUsers);


(async() => {
  let count = 0;
  for (var i = 1; i <= 10000000; i++) {
    const reviewCount = Math.ceil(3 + Math.random() * 20);
    if (i % 10000 === 0) {
      console.log(i);
    }
    for (var x = 0; x < reviewCount; x++) {
        count++;
        const restaurantId = i;
        const userId = Math.ceil(Math.random() * 10000000);
        const review = faker.lorem.words().toString();
        const overall = Math.ceil(Math.random() * 5);
        const food = Math.ceil(Math.random() * 5);
        const service = Math.ceil(Math.random() * 5);
        const ambience = Math.ceil(Math.random() * 5);
        const value = Math.ceil(Math.random() * 5);
        const noise = Math.ceil(Math.random() * 3);
        const wouldRecommend =(Math.random() * 2 > .5 ? false : true);
        const date = faker.date.past(3).toISOString();

        if (!compress.write(`${userId},${restaurantId},"${review}",${overall},${food},${service},${ambience},${value},${noise},${wouldRecommend},${date}\n`)) {
          await new Promise(resolve => {
            compress.once('drain', resolve);
          });
        }

        if (i === 10000000 && x === reviewCount - 1) {
          compress.end();
        }

        //console.log(`${userId},${restaurantId},"${review}",${overall},${food},${service},${ambience},${value},${noise},${wouldRecommend},${date}\n`);
    }
  }
})()

/*
\copy (SELECT restaurants.id, restaurants.name, users.username, users.background_color, users.location, users.vip, reviews.review, reviews.overall, reviews.food, reviews.service, reviews.ambience, reviews.value, reviews.noise, reviews.would_recommend, reviews.date FROM reviews INNER JOIN restaurants ON (reviews.restaurant_id = restaurants.id) INNER JOIN users ON (reviews.user_id = users.id)) to './cassandra_data.csv' with csv
*/