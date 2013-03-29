"use strict";

module.exports = function(app) {
    var config = app.plugins.shipgen.config[app.get('env')],
        levels = config.levels,
        numberOfClasses = config.numberOfClasses,

        // define models
        moduleSlot = app.schema.define('moduleSlot', {

            name: { type: String, default: '', length: 50},
            slug: { type: String, default: '', length: 50},
            published: { type: Boolean, default: false },
<<<<<<< HEAD
            category: { type: String, default: 'common' },

=======
           
>>>>>>> ee221bb38722308aed918cb14bdb2d0fd59903b9
            size: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            //~ crew: { type: Number, default: levels.min, min: levels.min, max: levels.max },

            modType: { type: String, default: 'weapon' }, //weapon, shield, hull, engine, sensor

            cost: { type: Number, default: levels.min, min: levels.min }
        });

    return moduleSlot;
}
