"use strict";

module.exports = function(app) {
    var levels = app.plugins.shipgen.config[app.get('env')].levels,
        // define models
        Shield = new app.Schema({
            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },
            category: { type: String, default: 'common' },

            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            shield: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            recharge: { type: Number, default: levels.min, min: levels.min, max: levels.max },
            consume: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            cost: { type: Number, default: levels.min, min: levels.min }
        });
    
    return Shield;
}

