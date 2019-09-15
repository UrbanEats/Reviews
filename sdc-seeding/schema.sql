DROP TABLE IF EXISTS reviews, users, restaurants;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(32),
  background_color VARCHAR(32),
  location VARCHAR(32),
  vip BOOLEAN
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  restaurant_id INTEGER,
  review TEXT,
  overall INTEGER,
  food INTEGER,
  service INTEGER,
  ambience INTEGER,
  value INTEGER,
  noise VARCHAR(32),
  would_recommend BOOLEAN,
  date DATE 
);