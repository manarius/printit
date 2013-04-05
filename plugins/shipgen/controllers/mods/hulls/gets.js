"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Hull = req.app.plugins.shipgen.models.mods.hull,
        where = {
            published: true
        };

    Hull.find(where).populate('class', 'name slug').exec(function (err, hulls) {
        if (!hulls || hulls.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/hulls/list', {objects: hulls});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Hull = req.app.plugins.shipgen.models.mods.hull,
        where = {
            published: true,
            slug: req.params.slug
        };

    Hull.findOne(where).populate('class', 'name slug').exec(function (err, hull) {

        if (!hull || hull.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/hulls/single', {object: hull});
    });
}
