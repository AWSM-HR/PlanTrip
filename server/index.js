const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Controller = require('../controller/models.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/api/recommended/:id', (req, res) => {
  const locations = [];
  Controller.getRecByLocation(req.params.id).subscribe({
    next: (rec) => locations.push(rec),
    error: (err) => res.status(400).send(err),
    complete: () => res.status(200).send(locations),
  });
});

module.exports = app;
