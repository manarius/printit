"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    var config = app.plugins.shipgen.config[app.get('env')],
        levels = config.levels,
        numberOfClasses = config.numberOfClasses,
        Slot = app.plugins.shipgen.models.slot,
        Crew = app.plugins.shipgen.models.people.crew,
        ShipClass = app.plugins.shipgen.models.shipClass,
        Fleet = app.plugins.shipgen.models.fleet,
        ObjectId = app.Schema.ObjectId,

        // define models
        shipSchema = new app.Schema({

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false, index: true },
            
            excerpt: { type: String, default: '', length: 255},
            desc: { type: String, default: '', length: 5000},


            slots: [{type: ObjectId, ref: 'Slot'}],
            crews: [{type: ObjectId, ref: 'Crew'}],
            
            fleet: {type: ObjectId, ref: 'Fleet'},
            class: {type: ObjectId, ref: 'ShipClass'},
            category: {type: String, default: 'common'},
            
            size: { type: Number, default: 1, min: levels.min, max: levels.max }, //the size of the ship, limited by the class
            cost: { type: Number, default: 1, min: levels.min },  //the total cost of the ship cassis, modules will have their own cost.
        });

    return mongoose.model('Ship', shipSchema);
}
