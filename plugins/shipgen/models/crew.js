"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        ObjectId = app.Schema.ObjectId,
    // define models
        crewSchema = new app.Schema({

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },
            category: { type: String, default: 'common' },
            
            excerpt: { type: String, default: '', length: 255},
            desc: { type: String, default: '', length: 5000},

            size: { type: Number, default: 1, min: levels.min, max: levels.max },

            cost: { type: Number, default: 1, min: levels.min }, //(cost in resources to build this ship)
            
            strength: { type: Number, default: 1, min: levels.min, max: levels.max },
            aim: { type: Number, default: 1, min: levels.min, max: levels.max },
            initiative: { type: Number, default: 1, min: levels.min, max: levels.max },
            morale: { type: Number, default: 1, min: levels.min, max: levels.max },
            
            fleet: { type: ObjectId, ref: 'Fleet'}
        });

    return mongoose.model('Crew', crewSchema);
}
