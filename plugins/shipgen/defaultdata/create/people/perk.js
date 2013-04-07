"use strict";


module.exports = function createPerk(models, i, dd, cb) {
    var Perk = models.people.perk;

    if (!dd) {
        throw 'createPerk was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createPerk was called without a slug or a name in the defaultdata object';
    }

    Perk.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Perk();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;
        
        obj.cost = dd.cost || 1,
        obj.costMultiply = dd.costMultiply || 1,
        
        obj.strength = dd.strength || 0,
        obj.aim = dd.aim || 0,
        obj.initiative = dd.initiative || 0,
        obj.morale = dd.morale || 0,
        
        obj.save(function (err, savedObj) {
            if (err) {
                console.log('err = ' + err);
            }
            
            console.log('perk saved ' + savedObj.slug);
            
            if (typeof cb === 'function') {
                cb(i);
            }
        });
    });
}
