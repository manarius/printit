"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Sensor = req.app.plugins.shipgen.models.mods.sensor,
        where = {
            published: true
        };

    Sensor.find(where).populate('class', 'name slug').exec(function (err, sensors) {
        if (!sensors || sensors.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/sensors/list', {objects: sensors});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Sensor = req.app.plugins.shipgen.models.mods.sensor,
        where = {
            published: true,
            slug: req.params.slug
        };

    Sensor.findOne(where).populate('class', 'name slug').exec(function 
    (err, sensor) {

        if (!sensor || sensor.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/sensors/single', {object: sensor});
    });
}
