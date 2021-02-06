/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const faker = require('faker');
const fs = require('fs');

function getRandomInt(max) {
  return (Math.random() * Math.floor(max)).toFixed(2);
}
const cats = ['Sightseeing', 'Nightlife', 'Beach', 'Family Friendly', 'Private Tours', 'Outdoor Adventures', 'Exotic'];

const getRandom = (arr) => {
  const r = Math.floor(Math.random() * arr.length);
  return r;
};

const randomS3 = () => {
  const randomIndex = Math.floor(Math.random() * 1021);
  return `https://recommendedsdc.s3-us-west-1.amazonaws.com/thailandPics/tripadvisor_thailand_${randomIndex}.jpg`;
};

// users
const availZips = [];

const genUsers = (num) => {
  const stream = fs.createWriteStream('./database/seeds/users/usersLg.csv');
  stream.write('personId:ID,name,:LABEL\n');
  const relStream = fs.createWriteStream('./database/seeds/relationships/likesLg.csv');
  relStream.write(':START_ID,:END_ID,:TYPE\n');

  const randomVisits = (max) => {
    const n = Math.floor(Math.random() * max);
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push((Math.floor(Math.random() * num * 100)));
    }
    return out;
  };
  const genLikes = (i) => {
    const likes = randomVisits(50);
    const visits = randomVisits(150);
    likes.forEach((like) => {
      relStream.write(`p${i},a${like},LIKED\n`);
    });
    visits.forEach((visit) => {
      relStream.write(`p${i},a${visit},VISITED\n`);
    });
  };

  for (let i = 0; i < num; i++) {
    stream.write(faker.fake(`p${i},{{name.firstName}},User\n`));
    genLikes(i);
  }

  relStream.end();
  stream.end();
};

const genLocations = async (num) => {
  const stream = fs.createWriteStream('./database/seeds/locations/adventuresLg.csv');
  stream.write('adventureId:ID,name,location,image,rating:float,price,overview,:LABEL\n');
  console.time();
  const catStream = fs.createWriteStream('./database/seeds/relationships/advCatsLg.csv');
  catStream.write(':START_ID,:END_ID,:TYPE\n');
  for (let i = 0; i < num; i++) {
    availZips.push(i);
    const zip = faker.fake('{{address.zipCode}}').split('-')[0];
    const ableToWrite = stream.write(faker.fake(`a${i},{{address.streetAddress}},${zip},${randomS3()},${getRandomInt(5)},\${{commerce.price}},{{lorem.paragraph}},Adventure\n`));
    if (!ableToWrite) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        stream.once('drain', resolve);
      });
    }
    catStream.write(`a${i},c${getRandom(cats)},IN_CATEGORY\n`);
  }
  console.timeEnd();
  stream.end();
};

const genDependents = (num) => {
  genLocations(num);
  genUsers(num / 100);
};
