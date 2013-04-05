"use strict";

module.exports = function createShip(models, i, dd, cb) {
    var Ship = models.ship,
        ShipClass = models.shipClass,
        Fleet = models.fleet,
        Crew = models.crew;
    
    if (!dd) {
        throw 'createShip was called without a defaultdata object';
    }
    
    if (!dd.slug || !dd.name) {
        throw 'createShip was called without a slug, a name or a category in the defaultdata object';
    }

    Ship.findOne({slug: dd.slug}, function (err, s) {
        s = s || new Ship();

        s.name = dd.name;
        s.slug = dd.slug;
        s.published = dd.published || false;
        s.category = dd.category || '';
        
        s.excerpt = dd.excerpt || '';
        s.desc = dd.desc || '';
        
        s.size = dd.size || 1;
        s.crew = dd.crew || 1;
        s.cost = dd.cost || 10;
        
        ShipClass.findOne({slug: dd.class}).exec(function (err, cl) {
            if ( err || !cl) {
                throw 'ShipClass ' + dd.class + ' could not be found';
            }

            s.class = cl._id;
            
            Fleet.findOne({slug: dd.fleet}).exec(function (err, fleet) {
                var found = false;
                
                s.fleet = fleet._id;

                s.save(function (err, sh) {
                    console.log('ship saved ' + sh.slug + ' err: ' + err);

                    if (typeof cb === 'function') {
                        cb(i);
                    }
                });
            });
        });
    });
}
