// configurando el node-postgres driver
var pg = require('pg');
var postgresUrl = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresUrl);
// conectando al servidor de postgres
client.connect();
// hacer el cliente disponible como un módulo de Node
module.exports = client;