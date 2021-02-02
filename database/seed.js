/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');

const Adventures = require('./index.js');

function getRandomInt(max) {
  return (Math.random() * Math.floor(max)).toFixed(2);
}

function picUrl(num) {
  const base = `https://tutorial90005123.s3.us-east-2.amazonaws.com/thailandPics/tripadvisor_thailand_${num}.jpg`;

  return base;
}

function randSubcategory() {
  const options = ['Tours & Sightseeing', 'Private & Custom Tours', 'Outdoor Adventures'];

  return options[Math.ceil(Math.random() * 3) - 1];
}

// eslint-disable-next-line func-names
const returnAdventure = function (num) {
  return {
    name: faker.address.streetName(),
    image: picUrl(num),
    reviews: faker.random.number(),
    rating: getRandomInt(5),
    price: `$${faker.commerce.price()}`,
    liked: false,
    timesBooked: faker.random.number(),
    subcategory: randSubcategory(),
    overview: faker.lorem.paragraph(),
  };
};

// eslint-disable-next-line no-plusplus
const results = [];
for (let i = 0; i < 100; i++) {
  Adventures.create(returnAdventure(i))
    .then((result) => {
      // eslint-disable-next-line no-console
      results.push(result);
      if (results.length === 100) {
        mongoose.connection.close();
        console.log('done');
      }
    })
    .catch((err) => err);
}
