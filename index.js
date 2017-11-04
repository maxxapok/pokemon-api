const pokemonsList = require('./data/pokemons.json');
const berriesList = require('./data/berries.json');
const server = require('./libs/server');
const port = process.env.PORT || process.env.LOCAL_SERVER_PORT || 3000;

const pokemonsApiInit = require('./libs/pokemons-rest');
const berriesApiInit = require('./libs/berries-rest');

pokemonsApiInit(server, pokemonsList);
berriesApiInit(server, berriesList);

server.listen(port, () => {
  console.log(`The server was successfully launched on port ${port}`);
});