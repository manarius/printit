"use strict";

var fs = require('fs'),
    path = require('path');

exports.index = function (req, res, next) {
    res.render(req.app.get('theme') + '/shipgen/people/index');
};
