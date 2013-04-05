"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        shipgenRootDir = '/' + config.rootUrl + '/',
        shipDir = path.join(req.app.get('views'), req.app.get('theme'), 'shipgen'),
        Slot = req.app.plugins.shipgen.models.slot,
        where = {
            published: true
        };
    
    Slot.find(where).populate('class', 'name slug').exec(function (err, slots) {

        if (!slots || slots.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/slots/list', {objects: slots});
    });
};


exports.single = function (req, res, next) {
    var templateFile = path.join(req.app.get('theme'), 'shipgen', 'slots', 'single.html'),
        Slot = req.app.plugins.shipgen.models.slot;

    Slot.findOne({slug: req.params.slug, published: true}).populate('class').exec(function (err, slot) {
        if (!slot) {
            next();
            return;
        }

        res.render(templateFile, {object: slot});
    });
}
