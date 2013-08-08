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
        
        res.render(req.app.get('theme') + '/shipgen/fleets/list', {objects: fleets});
    });
};


exports.single = function (req, res, next) {
    var Fleet = req.app.plugins.shipgen.models.fleet,
        Frame = req.app.plugins.shipgen.models.frame,
        Crew = req.app.plugins.shipgen.models.people.crew;

    Fleet.findOne({slug: req.params.slug, published: true}).exec(function (err, fleet) {
        if (!fleet) {
            next();
            return;
        }
        
        Frame.find({'fleet': fleet._id})
            .exec(function (err, frames) {

            Crew.find({'fleet': fleet._id})
                .exec(function (err, crews) {
                
                res.render(req.app.get('theme') + '/shipgen/fleets/single', {object: fleet, frames: frames, crews: crews});
            });
        });
    });
}
