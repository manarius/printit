"use strict";

module.exports = function createGenerator(models, i, dd, cb) {
    var Generator = models.mods.generator,
        ShipClass = models.shipClass;
    
    if (!dd) {
        throw 'createGenerator was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createGenerator was called without a slug or a name in the defaultdata object';
    }

    Generator.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Generator();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        obj.category = dd.category || '';
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;

        obj.damage = dd.damage || 2;
        obj.range = dd.range || 15;
        obj.reload = dd.reload || 1;
        obj.shots = dd.shots || 1;

        obj.size = dd.size || 1;

        obj.cost = dd.cost || 1;
        
        ShipClass.findOne({slug: dd.class}).exec(function(err, cl) {
            obj.class = cl._id;
            
            obj.save(function (err, savedObj) {
                console.log('generator saved ' + savedObj.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}