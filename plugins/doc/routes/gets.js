"use strict";
/**
 *  Route to controllers.
 */

module.exports = function (app) {
    var docdir = '/' + app.plugins.doc.config[app.get('env')].rootUrl,
        controllers = app.plugins.doc.controllers;

    app.get(docdir + '/:docSlug', controllers.gets.doc);
    app.get( '/rules', controllers.gets.rulesIndex);
    app.get( '/rules/:docSlug', controllers.gets.rule);
    app.get(docdir, controllers.gets.docdir);
};
