"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Captain = req.app.plugins.shipgen.models.people.captain,
        where = {
            published: true
        };
    
    if (req.params.categorySlug) {
        where.category = req.params.categorySlug;
    }
    
    
    Captain.find(where).populate('fleet', 'name slug').exec(function (err, captains) {

        if (!captains || captains.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/people/captains/list', {objects: captains});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Captain = req.app.plugins.shipgen.models.people.captain,
        where = {
            published: true,
            slug: req.params.slug
        };
    
    
    Captain.findOne(where).populate('fleet', 'name slug').exec(function (err, crew) {

        if (!crew || crew.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/people/captains/single', {object: crew});
    });
}
