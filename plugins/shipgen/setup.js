"use strict";

var path = require('path'),
    load = require('express-load');

module.exports = {
    do: function(app, cb) {

        if (typeof cb === 'function') {
            cb();
        }
    }
}
