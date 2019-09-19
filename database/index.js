var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    database: 'reviews'
  }
});

var getReviewsByRestaurantId = function(id) {
  return knex.from('reviews').innerJoin('restaurants', 'reviews.restaurant_id', 'restaurants.id').innerJoin('users', 'reviews.user_id', 'users.id').where({'restaurants.id': id});
};

var createReview = function(review) {
  return knex('reviews').insert(review);
};

var updateReviewById = function(id, review) {
  return knex('reviews').where('id', id).update(review);
};

var deleteReviewById = function(id) {
  return knex('reviews').where('id', id).del();
};

module.exports = {
  getReviewsByRestaurantId,
  createReview,
  deleteReviewById,
  updateReviewById,
};