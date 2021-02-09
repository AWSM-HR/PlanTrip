const { concat, of } = require('rxjs');
const { map } = require('rxjs/operators');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const user = process.env.NEO_USERNAME;
const pass = process.env.NEO_PASSWORD;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, pass));

const getRecommendations = () => {
  const randUser = '{personId: "p"+toInteger(floor(rand() * 100000))}';
  const rxSession = driver.rxSession({ database: 'sdc', defaultAccessMode: neo4j.session.READ });

  const neo = rxSession.run(`MATCH (u:User ${randUser})
    CALL apoc.neighbors.athop(u, 'LIKED', 3) YIELD node WITH node LIMIT 10
    WITH node.likeCount*2 + node.visitCount AS weightedCount, node.name AS adventure
    RETURN adventure ORDER BY weightedCount desc`)
    .records()
    .pipe(
      map((x) => x.get(0)),
    );
  return neo;
};

const getRecByLocation = (locId) => {
  const rxSession = driver.rxSession({ database: 'sdc', defaultAccessMode: neo4j.session.READ });
  const neo = rxSession.run(`match (:Adventure {adventureId: 'a${locId}'})-[:LIKED|VISITED*2]-(a:Adventure)
    with a limit 5
    return a order by a.weightedCount desc

    union

    match (:Adventure {adventureId: 'a${locId}'})-[:IN_CATEGORY*2]-(a:Adventure) with a limit 5
    return a order by a.weightedCount desc`)
    .records()
    .pipe(
      map((x) => x.get(0)),
    );
  return concat(neo, rxSession.close()));
};

module.exports = {
  getRecommendations,
  getRecByLocation,
};
