"use strict";

module.exports = function createFleet(models, i, dd, cb) {
    var Fleet = models.fleet;
    
    if (!dd) {
        throw 'createFleet was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createFleet was called without a slug or a name in the defaultdata object';
    }

    Fleet.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Fleet();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        
        obj.desc = dd.desc || 0;
        obj.excerpt = dd.excerpt || 1;
        
        obj.img = dd.img || '';
        obj.costMultiply = dd.costMultiply || 1;

        obj.save(function (err, savedObj) {
            console.log('fleet saved ' + savedObj.slug + ' err = ' + err);
            
            if (typeof cb === 'function') {
                cb(i);
            }
        });
    });
}
