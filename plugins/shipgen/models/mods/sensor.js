"use strict";

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        Sensor = app.schema.define('Sensor', {
            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },
            category: { type: String, default: 'common' },

            classID: {type: app.Schema.ObjectID, default: null },

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            crewSpace: { type: Number, default: 0, min: 0, max: levels.max },
            
            range: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            ecm: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            eccm: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            
            cost: { type: Number, default: levels.min, min: levels.min }
        });
    
    return Sensor;
}
