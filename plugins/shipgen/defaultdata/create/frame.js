"use strict";

module.exports = function createFrame(models, i, dd, cb) {
    var Frame = models.frame,
        FrameClass = models.frameClass,
        Fleet = models.fleet,
        Crew = models.people.crew;
    
    if (!dd) {
        throw 'createFrame was called without a defaultdata object';
    }
    
    if (!dd.slug || !dd.name) {
        throw 'createFrame was called without a slug, a name or a category in the defaultdata object';
    }

    Frame.findOne({slug: dd.slug}, function (err, s) {
        s = s || new Frame();

        s.name = dd.name;
        s.slug = dd.slug;
        s.published = dd.published || false;
        s.category = dd.category || '';
        
        s.excerpt = dd.excerpt || '';
        s.desc = dd.desc || '';
        
        s.size = dd.size || 1;
        s.crew = dd.crew || 1;
        s.cost = dd.cost || 10;
        
        FrameClass.findOne({slug: dd.class}).exec(function (err, cl) {
            if ( err || !cl) {
                throw 'FrameClass ' + dd.class + ' could not be found';
            }

            s.class = cl._id;
            
            Fleet.findOne({slug: dd.fleet}).exec(function (err, fleet) {
                var found = false;
                
                s.fleet = fleet._id;

                s.save(function (err, sh) {
                    console.log('frame saved ' + sh.slug + ' err: ' + err);

                    if (typeof cb === 'function') {
                        cb(i);
                    }
                });
            });
        });
    });
}
