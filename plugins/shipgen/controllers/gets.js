"use strict";

var path = require('path'),
    fs = require('fs'),
    async = require('async');
    
exports.index = function(req,res,next) {
    var models = req.app.plugins.shipgen.models,
        counts = {};
    
    async.parallel([
        function(cb) {
            models.ship.count({}, function (err, shipCount) {
                counts.ships = shipCount;
                cb(null);
            });
        },
        function(cb) {
            models.people.crew.count({}, function (err, crewCount) {
                counts.crews = crewCount;
                cb(null);
            });
        },
        function(cb) {
            models.people.captain.count({}, function (err, captainsCount) {
                counts.captains = captainsCount;
                cb(null);
            });
        },
        function(cb) {
            models.fleet.count({}, function (err, fleetCount) {
                counts.fleets = fleetCount;
                cb(null);
            });
        },
        function(cb) {
            models.shipClass.count({}, function (err, classCount) {
                counts.classes = classCount;
                cb(null);
            });
        },
        function(cb) {
            models.slot.count({}, function (err, slotCount) {
                counts.slots = slotCount;
                cb(null);
            });
        },
        function(cb) {
            models.mods.weapon.count({}, function (err, weaponCount) {
                counts.weapons = weaponCount;
                cb(null);
            });
        },
        function(cb) {
            models.mods.hull.count({}, function (err, hullCount) {
                counts.hulls = hullCount;
                cb(null);
            });
        },
        function(cb) {
            models.mods.shield.count({}, function (err, shieldCount) {
                counts.shields = shieldCount;
                cb(null);
            });
        },
        function(cb) {
            models.mods.sensor.count({}, function (err, sensorCount) {
                counts.sensors = sensorCount;
                cb(null);
            });
        },
        function(cb) {
            models.mods.engine.count({}, function (err, engineCount) {
                counts.engines = engineCount;
                cb(null);
            });
        }
    ],
    function() {
        res.render('printit/shipgen/index.html', {counts: counts});
    });
}

exports.setup = function (req, res, next) {
    res.render('printit/pages/setup.html');
}

exports.deleteAll = function (req, res, next) {
    res.render('printit/pages/deleteAll.html');
}
