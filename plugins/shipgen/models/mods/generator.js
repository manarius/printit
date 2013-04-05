"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        ObjectId = app.Schema.ObjectId,
        // define models
        schema = new app.Schema({

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false, index: true },

            desc: { type: String, default: '', length: 5000},
            excerpt: { type: String, default: '', length: 255},
            
            class: {type: ObjectId, default: null, ref: 'ShipClass' },

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            energy: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            cost: { type: Number, default: levels.min, min: levels.min }
        });

    return mongoose.model('Generator', schema);
}
