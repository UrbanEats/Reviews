var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    database: 'reviews'
  }
});

var getReviewsByRestaurantId = function(id) {
  return knex.from('reviews').innerJoin('restaurants', 'reviews.restaurant_id', 'restaurants.id').where({'restaurants.id': id});
};

module.exports = {
  getReviewsByRestaurantId: getReviewsByRestaurantId,
};
