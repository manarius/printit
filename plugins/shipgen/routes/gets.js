"use strict";
/**
 *	Route to controllers.
 */

module.exports = function (app) {
    var shipgendir = '/' + app.plugins.shipgen.config[app.get('env')].rootUrl;

    app.get(shipgendir + '/:ship', app.plugins.shipgen.controllers.gets.ship);
    
    app.get(shipgendir + '/mods/:modSlug', app.plugins.shipgen.controllers.gets.mods);

    app.get(shipgendir + '/:paginationIndex', app.plugins.shipgen.controllers.gets.shipList);

    app.get(shipgendir, app.plugins.shipgen.controllers.gets.shipList);
};
