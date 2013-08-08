"use strict";

/**
 *  Route to controllers.
 */

module.exports = function (app) {

  app.get('/', app.controllers.gets.index);

  app.get('/deleteAll', app.controllers.gets.deleteAll);

  app.get('/setup', app.controllers.gets.setup);

  app.get('/:page', app.controllers.gets.page);

  app.get('*', app.controllers.gets.fourofour);
};
