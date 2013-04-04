"use strict";
/**
 *  Route to controllers.
 */

module.exports = function (app) {
    var shipgendir = '/' + app.plugins.shipgen.config[app.get('env')].rootUrl,
        controllers = app.plugins.shipgen.controllers;

    app.get(shipgendir + '/setup', controllers.gets.setup);

    app.get(shipgendir + '/deleteAll', controllers.gets.deleteAll);

    app.get(shipgendir + '/ships', controllers.ships.gets.list);

    app.get(shipgendir + '/ships/category/:categorySlug', controllers.ships.gets.list);

    app.get(shipgendir + '/ships/:slug', controllers.ships.gets.single);

    app.get(shipgendir + '/fleets', controllers.fleets.gets.list);
    app.get(shipgendir + '/fleets/:slug', controllers.fleets.gets.single);

    app.get(shipgendir + '/classes', controllers.classes.gets.list);
    app.get(shipgendir + '/classes/:slug', controllers.classes.gets.single);

    app.get(shipgendir + '/crews', controllers.crews.gets.list);
    app.get(shipgendir + '/crews/:slug', controllers.crews.gets.single);

    app.get(shipgendir + '/slots', controllers.slots.gets.list);
    app.get(shipgendir + '/slots/:slug', controllers.slots.gets.single);

    //~ app.get(shipgendir + '/:collection/:slug', controllers.gets.single);
    
    app.get(shipgendir, controllers.gets.index);
};
