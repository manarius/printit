"use strict";


module.exports = function createCrew(models, i, dd, cb) {
    var Captain = models.people.captain,
        Fleet = models.fleet;

    if (!dd) {
        throw 'createCrew was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createCrew was called without a slug or a name in the defaultdata object';
    }

    Captain.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Captain();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        
        obj.category = dd.category;
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;
        
        obj.size = dd.size || 1,
        
        obj.cost = dd.cost || 1,
        
        obj.strength = dd.strength || 1,
        obj.aim = dd.aim || 1,
        obj.initiative = dd.initiative || 1,
        obj.morale = dd.morale || 2,
        
        Fleet.findOne({slug: dd.fleet}).exec(function (err, fleet) {
            obj.fleet = fleet._id;
        
            obj.save(function (err, savedObj) {
                console.log('Captain saved ' + savedObj.slug + ' err = ' + err);
                
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
