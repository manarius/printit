"use strict";

var path = require('path'),
    fs = require('fs');

exports.mods = function (req, res, next) {
    var modSlug = req.params.modSlug;
    
    res.render('shipgen/' + modSlug + '.html');
}

exports.shipList = function (req, res, next) {

    var config = req.app.plugins.shipgen.config[req.app.get('env')],
        shipgenRootDir = '/' + config.rootUrl + '/',
        shipDir = path.join(req.app.get('views'), req.app.get('theme'), 'shipgen'),
        Ship = req.app.plugins.shipgen.models.ship,
        shipCount,
        pagination = config.pagination,
        perpage = parseInt(pagination.perpage),
        paginationIndex = parseInt(req.params.paginationIndex || 0),
        nextPageIndex = paginationIndex + 1,
        prevPageIndex = paginationIndex - 1,
        category = req.params.category || false,
        skip = perpage * paginationIndex;

    if (isNaN(paginationIndex)) {
        res.redirect('404');
        return;
    }

    Ship.count(function (err, count) {

        if (skip > (count - perpage)) {
            pagination.next.show = false;
        } else {
            pagination.next.show = true;
        }

        if (paginationIndex <= 0) {
            pagination.prev.show = false;
        } else {
            pagination.prev.show = true;
        }

        pagination.prev.url = shipgenRootDir + prevPageIndex;
        pagination.next.url = shipgenRootDir + nextPageIndex;

        pagination.pages = pagination.pages || {};
        pagination.pages.current = nextPageIndex;

        pagination.pages.max = Math.ceil(count / perpage);

        var where = {
            published: true
        };

        Ship.all({where: where, order: 'updated DESC', limit: perpage, skip: skip}, function (err, ships) {
            if (!ships || ships.length <= 0) {
                next();
                return;
            }

            res.render(req.app.get('theme') + '/shipgen/shipList', {shipgenRootDir: shipgenRootDir, ships: ships, pagination: pagination});
        });
    });
};


exports.ship = function (req, res, next) {
    var shipTemplateFile = path.join(req.app.get('theme'), 'shipgen', 'ship.html'),
        Ship = req.app.plugins.shipgen.models.ship;

    Ship.findOne({where: {published: true, slug: req.params.ship}, order: 'updated ASC'}, function (err, ship) {

        fs.exists(path.join(req.app.get('views'), shipTemplateFile), function (exists) {

            if (!exists) {
                res.redirect('404');
            } else if (!ship) {
                next();
            } else {
                res.render(shipTemplateFile, {ship: ship});
            }
        });
    });
}

