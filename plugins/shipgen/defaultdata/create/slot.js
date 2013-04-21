"use strict";

module.exports = function createSlot(models, i, dd, cb) {
    var Slot = models.slot,
        FrameClass = models.frameClass;
    
    if (!dd) {
        throw 'createSlot was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createSlot was called without a slug or a name in the defaultdata object';
    }

    Slot.findOne({slug: dd.slug}).exec(function (err, s) {
        s = s || new Slot();

        s.name = dd.name;
        s.slug = dd.slug;
        s.published = dd.published || false;
        s.category = dd.category || '';
        
        s.desc = dd.desc;
        s.excerpt = dd.excerpt;

        s.size = dd.size || 1;

        s.cost = dd.cost || 1;
        
        FrameClass.findOne({slug: dd.class}).exec(function(err, cl) {
            s.class = cl._id;
            
            s.save(function (err, sl) {
                console.log('slot saved ' + sl.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
