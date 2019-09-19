require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const path = require('path');
const compression = require('compression');

const PORT = 3003;


app.use(express.static(path.join(__dirname, '../public')));
app.use('/:restaurantName', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/reviews/:restaurantName', (req, res) => {
  const id = req.params.restaurantName;
  console.log('ID:', id);
  db.getReviewsByRestaurantId(id)
    .then(data => {
      // console.log(data);
      res.send(data);
    });
});

app.post('/api/reviews/', (req, res) => {

  db.createReview(req.body)
    .then(data => {
      // console.log(data);
      res.send(data);
    });
});

app.patch('/api/reviews/:restaurantName', (req, res) => {
  const id = req.params.restaurantName;

  db.updateReviewById(id, req.body)
    .then(data => {
      // console.log(data);
      res.send(data);
    });
});

app.delete('/api/reviews/:restaurantName', (req, res) => {
  const id = req.params.restaurantName;

  db.deleteReviewById(id)
    .then(data => {
      // console.log(data);
      res.send(data);
    });
});


app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
