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
            
            class: {type: ObjectId, default: null, ref: 'FrameClass' },

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            //~ crewSpace: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            speed: { type: Number, default: levels.min, min: levels.min },
            accel: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            consume: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            
            cost: { type: Number, default: levels.min, min: levels.min }
        });

    return mongoose.model('Engine', schema);
}
