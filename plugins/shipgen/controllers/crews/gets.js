"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Crew = req.app.plugins.shipgen.models.crew,
        where = {
            published: true
        };
    
    if (req.params.categorySlug) {
        where.category = req.params.categorySlug;
    }
    
    
    Crew.find(where).populate('fleet', 'name slug').exec(function (err, crews) {

        if (!crews || crews.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/crews/list', {objects: crews});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Crew = req.app.plugins.shipgen.models.crew,
        where = {
            published: true,
            slug: req.params.slug
        };
    
    
    Crew.findOne(where).populate('fleet', 'name slug').exec(function (err, crew) {

        if (!crew || crew.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/crews/single', {object: crew});
    });
}
