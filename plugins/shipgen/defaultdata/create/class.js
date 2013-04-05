"use strict";

module.exports = function createClass(models, i, dd, cb) {
    var ShipClass = models.shipClass;

    if (!dd.slug || !dd.name) {
        throw 'createClass was called without a slug or a name in the defaultdata object';
    }

    ShipClass.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new ShipClass();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;
        
        obj.minCrew = dd.minCrew || 0;
        obj.maxCrew = dd.maxCrew || 1;
        
        obj.minSize = dd.minSize || 1;
        obj.maxSize = dd.maxSize || 2;
        
        obj.save(function (err, savedObj) {
            console.log('class saved ' + savedObj.slug + ' err = ' + err);
            
            if (typeof cb === 'function') {
                cb(i);
            }
        });
    });
}
