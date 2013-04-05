"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Shield = req.app.plugins.shipgen.models.mods.shield,
        where = {
            published: true
        };

    Shield.find(where).populate('class', 'name slug').exec(function (err, shields) {
        
        if (!shields || shields.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/shields/list', {objects: shields});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Shield = req.app.plugins.shipgen.models.mods.shield,
        where = {
            published: true,
            slug: req.params.slug
        };

    Shield.findOne(where).populate('class', 'name slug').exec(function (err, shield) {

        if (!shield || shield.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/shields/single', {object: shield});
    });
}
