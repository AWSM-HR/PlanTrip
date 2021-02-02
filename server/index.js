const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Adventures = require('../database/index.js');

const app = express();
var cors = require('cors')

const PORT = 8080;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/api/recommended', (req, res) => {
  Adventures.find({})
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/recommended/:id', (req, res) => {
  const { id } = req.params;
  Adventures.find({ _id: id })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/recommended/hello/:num', (req, res) => {
  const { num } = req.params;
  const assigments = {
    1: 'Recommended',
    2: 'Outdoor Adventures',
    3: 'Tours & Sightseeing',
    4: 'Private & Custom Tours',
    5: 'liked',
  };
  if (num === '5') {
    Adventures.find({ liked: true })
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    Adventures.find({ subcategory: assigments[num] })
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
});

app.put('/api/recommended/:id', (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;
  Adventures.findByIdAndUpdate(id, { liked: !liked }, { new: true, useFindAndModify: false })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
