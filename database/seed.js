/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');

function getRandomInt(max) {
  return (Math.random() * Math.floor(max)).toFixed(2);
}

function randSubcategory() {
  const options = ['Tours & Sightseeing', 'Private & Custom Tours', 'Outdoor Adventures'];

  return options[Math.ceil(Math.random() * 3) - 1];
}

const stream = fs.createWriteStream('./database/seed2.csv');
stream.write('name,image,reviews,rating,price,liked,timesBooked,subcategory,overview\n');
for (let i = 0; i < 100000; i++) {
  stream.write(faker.fake(`{{address.streetName}},{{image.city}},{{random.number}},${getRandomInt(5)},\${{commerce.price}},false,{{random.number}},${randSubcategory()},{{lorem.paragraph}}\n`));
}
stream.end();
