"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Weapon = req.app.plugins.shipgen.models.mods.weapon,
        where = {
            published: true
        };

    Weapon.find(where).populate('class', 'name slug').exec(function (err, weapons) {
        if (err || !weapons || weapons.length <= 0) {
            next();
            return;
        }
        
        
        for (var k in weapons) {
            console.log('weapons[k] = ' + weapons[k]);
        }
        res.render(req.app.get('theme') + '/shipgen/mods/weapons/list', {objects: weapons});
    });
};


exports.single = function (req, res, next) {
    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        Weapon = req.app.plugins.shipgen.models.mods.weapon,
        where = {
            published: true,
            slug: req.params.slug
        };

    Weapon.findOne(where).populate('class', 'name slug').exec(function (err, weapon) {

        if (err || !weapon || weapon.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/mods/weapons/single', {object: weapon});
    });
}
