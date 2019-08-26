const db = require('./index.js');
const faker = require('faker');

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seedRestaurants = () => {
  for (var i = 1; i <= 100; i++) {
    let input = 'INSERT INTO Restaurants (name) VALUE (?)';
    let value = ['L' + i];
    db.query(input, value, (error, results) => {
      if (error) {
        console.log(error, 'could not seed Restaurants');
      } else {
        // console.log(results);
      }
    }
  )};
}

const seedUsers = () => {
  for (var i = 1; i <= 300; i++) {
    let randomUser =  faker.name.firstName();
    let randomLocation = faker.address.city();
    let vipStatus = faker.random.boolean();

    let input = "INSERT INTO Users set ?";
    let value = {user: randomUser, location: randomLocation, vip: vipStatus};

    db.query(input, value, (error, results) => {
      if (error) {
        console.log(error, 'could not seed Users');
      } else {
        // console.log(results);
      }
    }
  )};
}

const seedReviews = () => {
  let noiseLevel = ['Quiet', 'Moderate', 'Energetic'];
  for (var i = 1; i <= 2500; i++) {
    let randomUserID =  getRandomIntInclusive(1, 300);
    let randomReview = faker.lorem.paragraph();
    let randomFood = getRandomIntInclusive(1, 5);
    let randomService = getRandomIntInclusive(1, 5);
    let randomAmbience = getRandomIntInclusive(1, 5);
    let randomValue = getRandomIntInclusive(1, 5);
    let overallAverage = (randomFood + randomService +randomAmbience + randomValue) / 4;
    let randomNoise = noiseLevel[getRandomIntInclusive(0, 2)];
    let recommend = faker.random.boolean();
    let randomDate = faker.date.past();
    let randomRestaurantID = getRandomIntInclusive(1, 100);

    let input = "INSERT INTO Reviews set ?";
    let value = {
      user_id: randomUserID, 
      review: randomReview,
      overall: overallAverage,
      food: randomFood, 
      service: randomService,
      ambience: randomAmbience,
      value: randomValue,
      noise: randomNoise,
      would_recommend: recommend,
      date: randomDate, 
      restaurant_id: randomRestaurantID
    };

    db.query(input, value, (error, results) => {
      if (error) {
        console.log(error, 'could not seed Users');
      } else {
        // console.log(results);
      }
    }
  )};
}

seedRestaurants();
seedUsers();
seedReviews();


