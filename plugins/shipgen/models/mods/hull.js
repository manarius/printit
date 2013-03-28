"use strict";

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        Hull = app.schema.define('Hull', {
            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },
            type: { type: String, default: 'common' },

            published: { type: Boolean, default: false, index: true },

            classID: {type: app.Schema.ObjectID, default: null },

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            crewSpace: { type: Number, default: 0, min: 0, max: levels.max },
            
            armor: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            repair: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            
            cost: { type: Number, default: levels.min, min: levels.min }
        });
    
    return Hull;
}

