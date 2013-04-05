"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Engine = req.app.plugins.shipgen.models.mods.engine,
        where = {
            published: true
        };

    Engine.find(where).populate('class', 'name slug').exec(function (err, engines) {
        if (err || !engines || engines.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/engines/list', {objects: engines});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Engine = req.app.plugins.shipgen.models.mods.engine,
        where = {
            published: true,
            slug: req.params.slug
        };

    Engine.findOne(where).populate('class', 'name slug').exec(function (err, engine) {

        if (err || !engine || engine.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/engines/single', {object: engine});
    });
}
