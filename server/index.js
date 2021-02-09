const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const user = process.env.NEO_USERNAME;
const pass = process.env.NEO_PASSWORD;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, pass));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/api/recommended/:id', (req, res) => {
  const session = driver.session({ database: 'sdc', defaultAccessMode: neo4j.session.READ });
  session.run(`match (:Adventure {adventureId: 'a${req.params.id}'})-[:LIKED|VISITED*2]-(a:Adventure)
    with a limit 5
    with a, a.likeCount*2 + a.visitCount as weight
    return a order by weight desc

    union

    match (:Adventure {adventureId: 'a${req.params.id}'})-[:IN_CATEGORY*2]-(a:Adventure) with a limit 5
    with a, a.likeCount * 2 + a.visitCount as weight
    return a order by weight desc`)
    .then((results) => results.records.map((record) => record.get(0)))
    .then((records) => res.status(200).send(records))
    .catch((err) => res.status(400).send(err))
    .then(() => session.close());
});

module.exports = app;
