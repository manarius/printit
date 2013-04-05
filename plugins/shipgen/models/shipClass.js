"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        classSchema = new app.Schema({

            name: { type: String, default: '', length: 50 },
            slug: { type: String, default: '', length: 50 },
            excerpt: { type: String, default: '', length: 255 },
            desc: { type: String },
            published: { type: Boolean, default: false, index: true },

            minSize:   { type: Number, default: levels.min, min: levels.min },
            maxSize:   { type: Number, default: levels.min, min: levels.min },

            minCrew:   { type: Number, default: levels.min, min: levels.min },
            maxCrew:   { type: Number, default: levels.min, min: levels.min }
        });

    return mongoose.model('ShipClass', classSchema);
}
