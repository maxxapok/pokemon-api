module.exports = function (server, berriesList) {
  const apiV1Path = '/api/v1/berry';

  server.get(apiV1Path, (req, res) => {
    try {
      const query = req.query;
      let formatedBerriesList = berriesList.slice();

      if (query.offset) {
        formatedBerriesList = formatedBerriesList.slice(query.offset);
      }

      if (query.limit) {
        formatedBerriesList = formatedBerriesList.slice(0, query.limit);
      }

      res.send(formatedBerriesList);

    } catch(e) {
      console.error(e);
      res.statusCode = 500;
      res.send('Internal server error');
    }
  });

  server.get(apiV1Path + '/:id', (req, res) => {
    try {
      const requestBerriesId = Number(req.params.id);

      if (!requestBerriesId) {
        res.statusCode = 400;
        res.send('Uncorrect berry\'s ID'); // Если requestBerriesId не число, ошибка
        return;
      }

      const currentBerry = berriesList.find(berry => berry.id == requestBerriesId);

      if (!currentBerry) {
        res.statusCode = 404;
        res.send('Berry not found'); // Если user не найден по ID, ошибка
        return;
      }

      res.send(currentBerry);

    } catch(e) {
      console.error(e);
      res.statusCode = 500;
      res.send('Internal server error');
    }
  });
};