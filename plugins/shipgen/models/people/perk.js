"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        ObjectId = app.Schema.ObjectId,

        schema = new app.Schema({

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false, index: true },

            excerpt: { type: String, default: '', length: 255},
            desc: { type: String, default: '', length: 5000},

            cost: { type: Number, default: 1, min: levels.min }, //(cost in resources to build this ship)
            costMultiply: { type: Number, default: 1, min: levels.min }, //(cost in resources to build this ship)

            strength: { type: Number, default: 1, min: 0, max: levels.max },
            aim: { type: Number, default: 1, min: 0, max: levels.max },
            initiative: { type: Number, default: 1, min: 0, max: levels.max },
            morale: { type: Number, default: 1, min: 0, max: levels.max }
        });

    return mongoose.model('Perk', schema);
}
