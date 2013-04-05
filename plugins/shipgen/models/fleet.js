"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        fleetSchema = new app.Schema({

            name: { type: String, default: '', length: 50 },
            slug: { type: String, default: '', length: 50 },
            excerpt: { type: String, default: '', length: 255 },
            desc: { type: String },
            img: { type: String, default: '', length: 50},
            
            published: { type: Boolean, default: false, index: true },

            costMultiply: { type: Number, default: '1'}
        });

    return mongoose.model('Fleet', fleetSchema);
}

