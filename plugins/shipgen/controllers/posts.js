"use strict";

var path = require('path'),
    form = require('express-form'),
    field = form.field,
    async = require('async');

exports.setup = function (req, res, next) {

    var errs = [],
        defaultdata = require(path.join(req.app.rootDir, 'plugins', 'shipgen', 'defaultdata.js')),
        i;

    async.waterfall([
        function (cb) {
            for (i = 0; i < defaultdata.fleets.length; i = i + 1) {
                defaultdata.createFleet(req.app.plugins.shipgen.models, i, defaultdata.fleets[i], function(j) {
                    if(j >= defaultdata.fleets.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.frameclasses.length; i = i + 1) {
                defaultdata.createClass(req.app.plugins.shipgen.models, i, defaultdata.frameclasses[i], function(j) {
                    if(j >= defaultdata.frameclasses.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.people.perks.length; i = i + 1) {
                defaultdata.people.createPerk(req.app.plugins.shipgen.models, i, defaultdata.people.perks[i], function(j) {
                    if(j >= defaultdata.people.perks.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.frames.length; i = i + 1) {
                defaultdata.createFrame(req.app.plugins.shipgen.models, i, defaultdata.frames[i], function(j) {
                    if(j >= defaultdata.frames.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.slots.length; i = i + 1) {
                defaultdata.createSlot(req.app.plugins.shipgen.models, i, defaultdata.slots[i], function(j) {
                    if(j >= defaultdata.slots.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.mods.engines.length; i = i + 1) {
                defaultdata.mods.createEngine(req.app.plugins.shipgen.models, i, defaultdata.mods.engines[i], function(j) {
                    if(j >= defaultdata.mods.engines.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.mods.hulls.length; i = i + 1) {
                defaultdata.mods.createHull(req.app.plugins.shipgen.models, i, defaultdata.mods.hulls[i], function(j) {
                    if(j >= defaultdata.mods.hulls.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.mods.shields.length; i = i + 1) {
                defaultdata.mods.createShield(req.app.plugins.shipgen.models, i, defaultdata.mods.shields[i], function(j) {
                    if(j >= defaultdata.mods.shields.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.mods.weapons.length; i = i + 1) {
                defaultdata.mods.createWeapon(req.app.plugins.shipgen.models, i, defaultdata.mods.weapons[i], function(j) {
                    if(j >= defaultdata.mods.weapons.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.mods.sensors.length; i = i + 1) {
                defaultdata.mods.createSensor(req.app.plugins.shipgen.models, i, defaultdata.mods.sensors[i], function(j) {
                    if(j >= defaultdata.mods.sensors.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.people.crews.length; i = i + 1) {
                defaultdata.people.createCrew(req.app.plugins.shipgen.models, i, defaultdata.people.crews[i], function(j) {
                    if(j >= defaultdata.people.crews.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.people.captains.length; i = i + 1) {
                defaultdata.people.createCaptain(req.app.plugins.shipgen.models, i, defaultdata.people.captains[i], function(j) {
                    if(j >= defaultdata.people.captains.length -1) {
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
        Frame = models.frame,
        FrameClass = models.frameClass,
        Fleet = models.fleet,
        Crew = models.people.crew,
        Captain = models.people.captain,
        Slot = models.slot,
        mods = models.mods;

    async.parallel([
        function (cb) {
            Frame.remove(function () {
                console.log('destroyed all frames');
                cb();
            });
        },
        function (cb) {
            FrameClass.remove(function () {
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
        },
        function (cb) {
            Captain.remove(function () {
                console.log('destroyed all captains');
                cb();
            });
        },
        function (cb) {
            Slot.remove(function () {
                console.log('destroyed all slots');
                cb();
            });
        },
        function (cb) {
            mods.sensor.remove(function () {
                console.log('destroyed all sensors');
                cb();
            });
        },
        function (cb) {
            mods.weapon.remove(function () {
                console.log('destroyed all weapons');
                cb();
            });
        },
        function (cb) {
            mods.shield.remove(function () {
                console.log('destroyed all shields');
                cb();
            });
        },
        function (cb) {
            mods.hull.remove(function () {
                console.log('destroyed all hulls');
                cb();
            });
        },
        function (cb) {
            mods.generator.remove(function () {
                console.log('destroyed all generators');
                cb();
            });
        },
        function (cb) {
            mods.engine.remove(function () {
                console.log('destroyed all engines');
                cb();
            });
        }
    ], function() { //runs after all functions above ran.
        res.render(req.app.get('theme') + '/pages/deleteAll.html', {completed: true});
    });
};
