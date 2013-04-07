"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Perk = req.app.plugins.shipgen.models.people.perk,
        where = {
            published: true
        };
    
    if (req.params.categorySlug) {
        where.category = req.params.categorySlug;
    }
    
    
    Perk.find(where).exec(function (err, perks) {

        if (err || !perks || perks.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/people/perks/list', {objects: perks});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Perk = req.app.plugins.shipgen.models.people.perk,
        where = {
            published: true,
            slug: req.params.slug
        };
    
    
    Perk.findOne(where).exec(function (err, perk) {

        if (err || !perk || perk.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/people/perks/single', {object: perk});
    });
}
