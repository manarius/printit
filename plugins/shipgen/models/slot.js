"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var config = app.plugins.shipgen.config[app.get('env')],
        levels = config.levels,
        numberOfClasses = config.numberOfClasses,
        ObjectId = app.Schema.ObjectId,

        // define models
        slotSchema = new app.Schema({

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            excerpt: { type: String, default: '', length: 255 },
            desc: { type: String },
            published: { type: Boolean, default: false },
            
            category: { type: String, default: 'common' },
            class: { type: ObjectId, ref: 'Class'},

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            
            cost: { type: Number, default: levels.min, min: levels.min }
        });

    return mongoose.model('Slot', slotSchema);
}
