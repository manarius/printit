"use strict";

module.exports = function createShield(models, i, dd, cb) {
    var Hull = models.mods.hull,
        FrameClass = models.frameClass;
    
    if (!dd) {
        throw 'createHull was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createHull was called without a slug or a name in the defaultdata object';
    }

    Hull.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Hull();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        obj.category = dd.category || '';
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;

        obj.size = dd.size || 1;
        
        obj.armor = dd.armor || 1; 
        obj.repair =  dd.repair || 1;

        obj.cost = dd.cost || 1;
        
        FrameClass.findOne({slug: dd.class}).exec(function(err, cl) {
            obj.class = cl._id;
            
            obj.save(function (err, savedObj) {
                console.log('hull saved ' + savedObj.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
