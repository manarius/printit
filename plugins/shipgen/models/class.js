"use strict";

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        Class = app.schema.define('Class', {

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },

            minSize:   { type: Number, default: 1, min: levels.min, max: levels.max },
            maxSize:   { type: Number, default: 1, min: levels.min, max: levels.max },
            
            //~ crewMin:   { type: Number, default: 0, min: levels.min, max: levels.max },
            //~ crewMax:   { type: Number, default: 0, min: levels.min, max: levels.max },
        
            cost:      { type: Number, default: 1, min: levels.min }
        });

    return Class;
}
