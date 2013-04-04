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
            models.crew.count({}, function (err, crewCount) {
                counts.crews = crewCount;
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
            models.class.count({}, function (err, classCount) {
                counts.classes = classCount;
                cb(null);
            });
        },
        function(cb) {
            models.slot.count({}, function (err, slotCount) {
                counts.slots = slotCount;
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
