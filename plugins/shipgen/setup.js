"use strict";

module.exports = {
    do: function(app, cb) {

        if (typeof cb === 'function') {
            cb();
        }
    }
}
