"use strict";

/**
 * handles all get requests. 
*/

var fs = require('fs'),
    path = require('path'),
    form = require('express-form'),
    field = form.field;

exports.index = function (req, res, next) {
    var templateFile = path.join(req.app.get('views'), req.app.get('theme'), 'pages', req.params.page + '.jade'),
        Page = req.app.models.page;

    Page.findOne({published: true, slug: 'home', order: 'updated ASC'}, function (err, page) {

        if (!page) {
            next();
            return;
        }

        fs.exists(templateFile, function (exists) {
            if (!exists) {
                res.render(req.app.get('theme') + '/page', page);
            } else {
                res.render(req.app.get('theme') + '/pages/' + req.params.page, page);
            }
        });
    });
};

exports.page = function (req, res, next) {
    var templateFile = path.join(req.app.get('views'), req.app.get('theme'), 'pages', req.params.page + '.jade'),
        Page = req.app.models.page;

    Page.findOne({published: true, slug: req.params.page}, function (err, page) {

        if (!page) {
            next();
            return;
        }

        fs.exists(templateFile, function (exists) {
            if (!exists) { //load default page template
                res.render(req.app.get('theme') + '/page', page);
            } else { //load custom page template
                res.render(req.app.get('theme') + '/pages/' + req.params.page, page);
            }
        });
    });
};

exports.fourofour = function (req, res) {
    res.render(req.app.get('theme') + '/pages/fourofour', function (err, page) {
        res.send(page, 404);
    });
};

exports.setup = function (req, res) {
    res.render(req.app.get('theme') + '/pages/setup');
};

exports.deleteAll = function (req, res) {
    res.render(req.app.get('theme') + '/pages/deleteAll');
};
