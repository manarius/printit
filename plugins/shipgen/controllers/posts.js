"use strict";

var path = require('path'),
    form = require('express-form'),
    field = form.field,
    async = require('async');

function createFleet(models, i, dd, cb) {
    var Fleet = models.fleet;
    
    if (!dd) {
        throw 'createFleet was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createFleet was called without a slug or a name in the defaultdata object';
    }

    Fleet.findOne({slug: dd.slug}).exec(function (err, c) {
        c = c || new Fleet();

        c.name = dd.name;
        c.slug = dd.slug;
        c.published = dd.published || false;
        
        c.desc = dd.desc || 0;
        c.excerpt = dd.excerpt || 1;
        
        c.img = dd.img || '';
        c.costMultiply = dd.costMultiply || 1;

        c.save(function (err, cl) {
            console.log('fleet saved ' + cl.slug + ' err = ' + err);
            
            if (typeof cb === 'function') {
                cb(i);
            }
        });
    });
}
function createCrew(models, i, dd, cb) {
    var Crew = models.crew,
        Fleet = models.fleet;

    if (!dd) {
        throw 'createCrew was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createCrew was called without a slug or a name in the defaultdata object';
    }

    Crew.findOne({slug: dd.slug}).exec(function (err, c) {
        c = c || new Crew();

        c.name = dd.name;
        c.slug = dd.slug;
        c.published = dd.published || false;
        
        c.desc = dd.desc;
        c.excerpt = dd.excerpt;
        console.log('excerpt = ' + dd.excerpt);
        
        c.size = dd.size || 1,
        
        c.cost = dd.cost || 1,
        
        c.strength = dd.strength || 1,
        c.aim = dd.aim || 1,
        c.initiative = dd.initiative || 1,
        c.morale = dd.morale || 2,
        
        Fleet.findOne({slug: dd.fleet}).exec(function (err, fleet) {
            c.fleet = fleet._id;
        
            c.save(function (err, cl) {
                console.log('crew saved ' + cl.slug + ' err = ' + err);
                
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
function createClass(models, i, dd, cb) {
    var Class = models.class;

    if (!dd.slug || !dd.name) {
        throw 'createClass was called without a slug or a name in the defaultdata object';
    }

    Class.findOne({slug: dd.slug}).exec(function (err, c) {
        c = c || new Class();

        c.name = dd.name;
        c.slug = dd.slug;
        c.published = dd.published || false;
        
        c.desc = dd.desc;
        c.excerpt = dd.excerpt;
        
        c.minCrew = dd.minCrew || 0;
        c.maxCrew = dd.maxCrew || 1;
        
        c.minSize = dd.minSize || 1;
        c.maxSize = dd.maxSize || 2;
        
        c.save(function (err, cl) {
            console.log('class saved ' + cl.slug + ' err = ' + err);
            
            if (typeof cb === 'function') {
                cb(i);
            }
        });
    });
}


function createSlot(models, i, dd, cb) {
    var Slot = models.slot;
    if (!dd.slug || !dd.name) {
        throw 'createSlot was called without a slug or a name in the defaultdata object';
    }

    Slot.findOne({slug: dd.slug}).exec(function (err, c) {
        s = s || new Slot();

        s.name = dd.name;
        s.slug = dd.slug;
        s.published = dd.published || false;
        s.img = dd.img || '';
        s.category = dd.category || '';

        s.size = dd.size || 1;

        s.cost = dd.cost || 1;
        
        Class.findOne({slug: dd.classSlug}).exec(function(err, cl) {
            s.class = cl._id;
            
            c.save(function (err, cl) {
                console.log('fleet saved ' + cl.slug + ' err = ' + err);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}

function createShip(models, i, dd, cb) {
    var Ship = models.ship,
        Class = models.class,
        Fleet = models.fleet,
        Crew = models.crew;
    
    if (!dd.slug || !dd.name || !dd.category) {
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
        
        Class.findOne({slug: dd.class}).exec(function (err, cl) {
            if ( err || !cl) {
                throw 'Class ' + dd.class + ' could not be found';
            }
            s.class = cl._id;
            
            Fleet.findOne({slug: dd.fleet}).exec(function (err, fleet) {
                var found = false;
                    
                s.fleets.forEach(function(fl) {
                    if (fleet.id == fl) {
                        found = true;
                    }
                });
                
                if (!found) {
                    s.fleets.push(fleet);
                }

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

exports.setup = function (req, res, next) {

    var errs = [],
        defaultdata = require(path.join(req.app.rootDir, 'plugins', 'shipgen', 'defaultdata.js')),
        i;

    async.waterfall([
        function (cb) {
            for (i = 0; i < defaultdata.fleets.length; i = i + 1) {
                createFleet(req.app.plugins.shipgen.models, i, defaultdata.fleets[i], function(j) {
                    if(j >= defaultdata.fleets.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.shipclasses.length; i = i + 1) {
                createClass(req.app.plugins.shipgen.models, i, defaultdata.shipclasses[i], function(j) {
                    if(j >= defaultdata.shipclasses.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.ships.length; i = i + 1) {
                createShip(req.app.plugins.shipgen.models, i, defaultdata.ships[i], function(j) {
                    if(j >= defaultdata.ships.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.crews.length; i = i + 1) {
                createCrew(req.app.plugins.shipgen.models, i, defaultdata.crews[i], function(j) {
                    if(j >= defaultdata.crews.length -1) {
                        cb(null);
                    }
                });
            }
        }
    ]);
    res.render(req.app.get('theme') + '/pages/setup.html', {errs: errs, completed: true});
};


exports.deleteAll = function (req, res) {
    var models = req.app.plugins.shipgen.models,
        Ship = models.ship,
        Class = models.class,
        Fleet = models.fleet;

    async.parallel([
        function (cb) {
            Ship.remove(function () {
                console.log('destroyed all ships');
                cb();
            });
        },
        function (cb) {
            Class.remove(function () {
                console.log('destroyed all classes');
                cb();
            });
        },
        function (cb) {
            Fleet.remove(function () {
                console.log('destroyed all fleets');
                cb();
            });
        },
        function (cb) {
            Crew.remove(function () {
                console.log('destroyed all crews');
                cb();
            });
        }
    ], function() { //runs after all functions above ran.
        res.render(req.app.get('theme') + '/pages/deleteAll.html', {completed: true});
    });
};
