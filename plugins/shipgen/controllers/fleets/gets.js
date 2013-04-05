"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Fleet = req.app.plugins.shipgen.models.fleet,
        where = {
            published: true
        };
    
    Fleet.find(where).exec(function (err, fleets) {

        if (!fleets || fleets.length <= 0) {
            next();
            return;
        }
        
        res.render(req.app.get('theme') + '/shipgen/fleets/list.html', {objects: fleets});
    });
};


exports.single = function (req, res, next) {
    var Fleet = req.app.plugins.shipgen.models.fleet,
        Ship = req.app.plugins.shipgen.models.ship,
        Crew = req.app.plugins.shipgen.models.crew,
        templateFile = path.join(req.app.get('theme'), 'shipgen', 'fleets', 'single.html');

    Fleet.findOne({slug: req.params.slug, published: true}).exec(function (err, fleet) {
        if (!fleet) {
            next();
            return;
        }
        
        Ship.find({'fleet': fleet._id})
            .exec(function (err, ships) {
                
            Crew.find({'fleet': fleet._id})
                .exec(function (err, crews) {
                    
                res.render(templateFile, {object: fleet, ships: ships, crews: crews});
            });
        });
    });
}
