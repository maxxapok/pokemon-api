module.exports = function (server, pokemonsList) {
  const apiV1Path = '/api/v1/pokemon';

  server.get(apiV1Path, (req, res) => {
    try {
      const query = req.query;
      let formatedPokemonsList = pokemonsList.slice();

      if (query.offset) {
        formatedPokemonsList = formatedPokemonsList.slice(query.offset);
      }

      if (query.limit) {
        formatedPokemonsList = formatedPokemonsList.slice(0, query.limit);
      }

      res.send(formatedPokemonsList);

    } catch(e) {
      console.error(e);
      res.statusCode = 500;
      res.send('Internal server error');
    }
  });

  server.get(apiV1Path + '/:name', (req, res) => {
    try {
      const requestPokemonName = req.params.name;

      if (!requestPokemonName) {
        res.statusCode = 400;
        res.send('Uncorrect pokemon\'s Name'); // Если requestPokemonName не число, ошибка
        return;
      }

      const currentPokemon = pokemonsList.find(pokemon => pokemon.name === requestPokemonName);
      
      if (!currentPokemon) {
        res.statusCode = 404;
        res.send('Pokemon not found'); // Если user не найден по ID, ошибка
        return;
      }

      res.send(currentPokemon);

    } catch(e) {
      console.error(e);
      res.statusCode = 500;
      res.send('Internal server error');
    }
  });
};