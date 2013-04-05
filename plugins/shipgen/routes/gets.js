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

    app.get(shipgendir + '/people', controllers.people.gets.index);
    app.get(shipgendir + '/people/crews', controllers.people.crews.gets.list);
    app.get(shipgendir + '/people/crews/category/:categorySlug', controllers.people.crews.gets.list);
    app.get(shipgendir + '/people/crews/:slug', controllers.people.crews.gets.single);

    app.get(shipgendir + '/people/captains', controllers.people.captains.gets.list);
    app.get(shipgendir + '/people/captains/:slug', controllers.people.captains.gets.single);

    app.get(shipgendir + '/slots', controllers.slots.gets.list);
    app.get(shipgendir + '/slots/:slug', controllers.slots.gets.single);
    
    app.get(shipgendir + '/mods', controllers.mods.gets.list);
    
    app.get(shipgendir + '/mods/engines', controllers.mods.engines.gets.list);
    app.get(shipgendir + '/mods/engines/:slug', controllers.mods.engines.gets.single);

    app.get(shipgendir + '/mods/shields', controllers.mods.shields.gets.list);
    app.get(shipgendir + '/mods/shields/:slug', controllers.mods.shields.gets.single);
    
    app.get(shipgendir + '/mods/hulls', controllers.mods.hulls.gets.list);
    app.get(shipgendir + '/mods/hulls/:slug', controllers.mods.hulls.gets.single);
    
    app.get(shipgendir + '/mods/weapons', controllers.mods.weapons.gets.list);
    app.get(shipgendir + '/mods/weapons/:slug', controllers.mods.weapons.gets.single);
    
    app.get(shipgendir + '/mods/sensors', controllers.mods.sensors.gets.list);
    app.get(shipgendir + '/mods/sensors/:slug', controllers.mods.sensors.gets.single);

    //~ app.get(shipgendir + '/:collection/:slug', controllers.gets.single);
    
    app.get(shipgendir, controllers.gets.index);
};
