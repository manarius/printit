"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Generator = req.app.plugins.shipgen.models.mods.generator,
        where = {
            published: true
        };

    Generator.find(where).populate('class', 'name slug').exec(function (err, generators) {
        if (!generators || generators.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/generators/list', {objects: generators});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Generator = req.app.plugins.shipgen.models.mods.generator,
        where = {
            published: true,
            slug: req.params.slug
        };

    Generator.findOne(where).populate('class', 'name slug').exec(function (err, generator) {

        if (!generator || generator.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/generators/single', {object: generator});
    });
}
