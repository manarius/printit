"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {
    res.render(req.app.get('theme') + '/shipgen/mods/list');
};
