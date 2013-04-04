"use strict";
/**
 *	Route to controllers.
 */

module.exports = function (app) {
    var shipgendir = '/' + app.plugins.shipgen.config[app.get('env')].rootUrl;

    app.post(shipgendir + '/setup', app.plugins.shipgen.controllers.posts.setup);

    app.post(shipgendir + '/deleteAll', app.plugins.shipgen.controllers.posts.deleteAll);
};
