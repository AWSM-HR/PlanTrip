const { map } = require('rxjs/operators');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const user = process.env.NEO_USERNAME;
const pass = process.env.NEO_PASSWORD;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(user, pass));
const rxSession = driver.rxSession({ database: 'sdc', defaultAccessMode: neo4j.session.READ });

const getRecommendations = () => {
  const randUser = '{personId: "p"+toInteger(floor(rand() * 100000))}';

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
  const neo = rxSession.run(`match (a:Adventure {adventureId: 'a${locId}'})
    call apoc.neighbors.athop(a, '<', 1) yield node with node as users limit 3
    call apoc.neighbors.athop(users, '>', 1) yield node
    with node.likeCount*3+node.visitCount*2 as weightedCount, node
    return node, weightedCount
    order by weightedCount desc limit 5

    union

    match (:Adventure {adventureId: 'a${locId}'})-[:IN_CATEGORY]->(c:Category)
    match (c)<-[:IN_CATEGORY]-(a:Adventure) where not a.adventureId = 'a${locId}'
    with a.likeCount*2+a.visitCount as weightedCount, a limit 10
    return a as node, weightedCount
    order by weightedCount desc limit 5`)
    .records()
    .pipe(
      map((x) => x.get(0)),
    );
  return neo;
};

module.exports = {
  getRecommendations,
  getRecByLocation,
};
