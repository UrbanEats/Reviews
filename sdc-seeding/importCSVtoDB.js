const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
});

client.connect();

console.log('starting...');
client.query('COPY restaurants (name) FROM \'/Users/jianyeung/HackReactor/Reviews/sdc-seeding/data_restaurants.csv\';', (err1, res) => {
  if (!err1) {
    console.log('finished restaurants');
    client.query('COPY users (username, background_color, location, vip) FROM \'/Users/jianyeung/HackReactor/Reviews/sdc-seeding/data_users.csv\' DELIMITER \',\' CSV;', (err2, res) => {
      if (!err2) {
        console.log('finished users');
        client.query('COPY reviews (user_id, restaurant_id, review, overall, food, service, ambience, value, noise, would_recommend, date) FROM \'/Users/jianyeung/HackReactor/Reviews/sdc-seeding/data_reviews.csv\' DELIMITER \',\' CSV;', (err3, res) => {
          console.log('finished reviews');
          client.end();
        });
      } else {
        client.end();
      }
    });
  } else {
    client.end();
  }
});

// const fs = require('fs');
// const split = require('split');
// var knex = require('knex')({
//   client: 'pg',
//   version: '7.2',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     database: 'reviews'
//   }
// });

// const LineByLineReader = require('line-by-line');
// const lr = new LineByLineReader('reviews_data.json');

// console.log('start');
// const run = async () => {
//   let counter = 0;
//   let total = 0;

//   lr.on('line', (line) => {
//     total++;

//     if (total % 100000 === 0) {
//       console.log(total);
//     }

//     if (counter >= 4096 * 4) {
//       lr.pause();
//     } else {
//       counter++;
//       let json = JSON.parse(line);
//       knex('reviews').insert({
//         restaurant_id: json.restaurantId,
//         user_id: json.userId, 
//         review: json.review, 
//         overall: json.overall, 
//         food: json.food, 
//         service: json.service, 
//         ambience: json.ambience, 
//         value: json.value, 
//         noise: json.noise, 
//         would_recommend: json.wouldRecommend, 
//         date: json.date
//       }).then((data) => {
//         counter--;
//         if (counter < 4096 * 4) {
//           lr.resume();
//         }
//       });
//     }
//   })

//   lr.on('end', () => {
//     console.log(Date.now() - start, 'ms');
//   });
// }

// run();

// var count = 0;
// lr.on('data', function(data) {
//   if (count >= 4096) {
//     lr.pause();
//   } else {
//     count++;
//     var json = JSON.parse(data);
//     console.log(data);
//     knex('reviews').insert({
//       restaurant_id: json.restaurantId,
//       user_id: json.userId, 
//       review: json.review, 
//       overall: json.overall, 
//       food: json.food, 
//       service: json.service, 
//       ambience: json.ambience, 
//       value: json.value, 
//       noise: json.noise, 
//       would_recommend: json.wouldRecommend, 
//       date: json.date
//     }).then((data) => {
//       count--;
//       if (count < 4096) {
//         lr.resume();
//       }
//     });
//   }
// });

// async function processLineByLine() {
//   const fileStream = fs.createReadStream('reviews_data.json');

//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });
//   // Note: we use the crlfDelay option to recognize all instances of CR LF
//   // ('\r\n') in input.txt as a single line break.
//   let count = 0;
//   for await (const line of rl) {
//     // Each line in input.txt will be successively available here as `line`.
//     var json = JSON.parse(line);
//     knex('reviews').insert({
//       restaurant_id : json.restaurantId,
//       user_id : json.userId, 
//       review : json.review, 
//       overall : json.overall, 
//       food : json.food, 
//       service : json.service, 
//       ambience : json.ambience, 
//       value : json.value, 
//       noise : json.noise, 
//       would_recommend : json.wouldRecommend, 
//       date : json.date
//     }).then(() => {
//       count++;
//       if (count % 1000000 === 0) {
//         console.log(count);
//       }
//     })
//   }
// }

// processLineByLine();