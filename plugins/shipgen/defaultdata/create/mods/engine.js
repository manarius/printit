"use strict";

module.exports = function createShield(models, i, dd, cb) {
    var Engine = models.mods.engine,
        FrameClass = models.frameClass;
    
    if (!dd) {
        throw 'createEngine was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createEngine was called without a slug or a name in the defaultdata object';
    }

    Engine.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Engine();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        obj.category = dd.category || '';
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;

        obj.size = dd.size || 1;
        
        obj.speed = dd.speed || 1; 
        obj.accel =  dd.accel || 1;
        obj.consume = dd.consume || 1, 

        obj.cost = dd.cost || 1;
        
        FrameClass.findOne({slug: dd.class}).exec(function(err, cl) {
            obj.class = cl._id;

            obj.save(function (err, savedObj) {
                console.log('engine saved ' + savedObj.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
