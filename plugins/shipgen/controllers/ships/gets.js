"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        shipgenRootDir = '/' + config.rootUrl + '/',
        shipDir = path.join(req.app.get('views'), req.app.get('theme'), 'shipgen'),
        Ship = req.app.plugins.shipgen.models.ship,
        shipCount,
        where = {
            published: true
        };
    
    if (req.params.categorySlug) {
        where.category = req.params.categorySlug;
    }
    
    
    Ship.find(where).populate('class fleets').exec(function (err, ships) {

        if (!ships || ships.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/ships/list', {shipgenRootDir: shipgenRootDir, objects: ships});
    });
};


exports.single = function (req, res, next) {
    var shipTemplateFile = path.join(req.app.get('theme'), 'shipgen', 'ships', 'single.html'),
        Ship = req.app.plugins.shipgen.models.ship;

    Ship.findOne({slug: req.params.slug, published: true}).populate('class fleets').exec(function (err, ship) {
        if (!ship) {
            next();
            return;
        }
        
        fs.exists(path.join(req.app.get('views'), shipTemplateFile), function (exists) {

            if (!exists) {
                next();
            } else {
                res.render(shipTemplateFile, {object: ship});
            }
        });
    });
}
