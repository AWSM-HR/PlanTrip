// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://database:27017/recommended', {
//   useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
// })
//   .then((results) => results)
//   .catch((err) => err);

// const adventuresSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   reviews: Number,
//   rating: Number,
//   price: String,
//   liked: Boolean,
//   timesBooked: Number,
//   subcategory: String,
//   overview: String,
// });

// const Adventures = mongoose.model('Adventures', adventuresSchema);

// module.exports = Adventures;
const neo4j = require('neo4j-driver');

const singleRecord = '(:Adventure {name: line.name, image: line.image, reviews: toInteger(line.reviews), rating: toInteger(line.rating), price: line.price, liked: toBoolean(line.liked), timesBooked: toInteger(line.timesBooked), subcategory: line.subcategory, overview: line.overview})';
const loadScript = `using periodic commit 100 load csv with headers from \'file:///seeds/seed1.csv\' as line create ${singleRecord}`;

const seed = async () => {
  const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('jon', '56Dad59Mom'));
  const session = driver.session({ database: 'test', defaultAccessMode: neo4j.session.WRITE });
  await session
    .run(`${loadScript} RETURN linenumber()`)
    .catch((err) => console.log(err))
    .then(() => console.log('done'));
  await driver.close();
}
