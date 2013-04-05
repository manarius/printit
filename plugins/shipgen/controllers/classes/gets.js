"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        shipgenRootDir = '/' + config.rootUrl + '/',
        ShipClass = req.app.plugins.shipgen.models.shipClass,
        templateFile = path.join(req.app.get('theme'), 'shipgen', 'classes', 'list.html'),
     

        where = {
            published: true
        };
    
    ShipClass.find(where).sort('maxSize').exec(function (err, classes) {

        if (!classes || classes.length <= 0) {
            next();
            return;
        }
        
        res.render(templateFile, {objects: classes});
    });
};


exports.single = function (req, res, next) {
    var Fleet = req.app.plugins.shipgen.models.fleet,
        ShipClass = req.app.plugins.shipgen.models.shipClass,
        Ship = req.app.plugins.shipgen.models.ship,
        Slot = req.app.plugins.shipgen.models.slot,
        templateFile = path.join(req.app.get('theme'), 'shipgen', 'classes', 'single.html');

    ShipClass.findOne({slug: req.params.slug, published: true}).exec(function (err, cl) {
        if (!cl) {
            next();
            return;
        }
                
        Ship.find({class: cl.id}).exec(function (err, ships) {
            Slot.find({class: cl.id}).exec(function (err, slots) {
                
                res.render(templateFile, {object: cl, ships: ships, slots: slots});
            });
        });
    });
}
