"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        shipgenRootDir = '/' + config.rootUrl + '/',
        shipDir = path.join(req.app.get('views'), req.app.get('theme'), 'shipgen'),
        Frame = req.app.plugins.shipgen.models.frame,
        frameCount,
        where = {
            published: true
        };

    if (req.params.categorySlug) {
        where.category = req.params.categorySlug;
    }

    Frame.find(where).populate('class fleet', 'name slug').exec(function (err, frames) {

        if (!frames || frames.length <= 0) {
            next();
            return;
        }

        res.render(req.app.get('theme') + '/shipgen/frames/list', {shipgenRootDir: shipgenRootDir, objects: frames});
    });
};


exports.single = function (req, res, next) {
    var frameTemplateFile = path.join(req.app.get('theme'), 'shipgen', 'frames', 'single.html'),
        Frame = req.app.plugins.shipgen.models.frame;

    Frame.findOne({slug: req.params.slug, published: true})
        .populate('class fleet', 'name slug')
        .populate('slots')
        .exec(function (err, frame) {
        
        if (!frame) {
            next();
            return;
        }
        
        fs.exists(path.join(req.app.get('views'), frameTemplateFile), function (exists) {

            if (!exists) {
                next();
            } else {
                res.render(frameTemplateFile, {object: frame});
            }
        });
    });
}
