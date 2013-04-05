"use strict";

module.exports = function createShield(models, i, dd, cb) {
    var Shield = models.shield,
        ShipClass = models.shipClass;
    
    if (!dd) {
        throw 'createShield was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createShield was called without a slug or a name in the defaultdata object';
    }

    Shield.findOne({slug: dd.slug}).exec(function (err, s) {
        s = s || new Shield();

        s.name = dd.name;
        s.slug = dd.slug;
        s.published = dd.published || false;
        s.category = dd.category || '';
        
        s.desc = dd.desc;
        s.excerpt = dd.excerpt;

        obj.strength: dd.strength || 1, 
        obj.regen = dd.regen || 1, 
        obj.consume = dd.consume || 1, 
        
        s.size = dd.size || 1;

        s.cost = dd.cost || 1;
        
        
        ShipClass.findOne({slug: dd.class}).exec(function(err, cl) {
            s.class = cl._id;
            
            s.save(function (err, sh) {
                console.log('shield saved ' + sh.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
