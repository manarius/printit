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
            for (i = 0; i < defaultdata.shipclasses.length; i = i + 1) {
                defaultdata.createClass(req.app.plugins.shipgen.models, i, defaultdata.shipclasses[i], function(j) {
                    if(j >= defaultdata.shipclasses.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.ships.length; i = i + 1) {
                defaultdata.createShip(req.app.plugins.shipgen.models, i, defaultdata.ships[i], function(j) {
                    if(j >= defaultdata.ships.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.crews.length; i = i + 1) {
                defaultdata.createCrew(req.app.plugins.shipgen.models, i, defaultdata.crews[i], function(j) {
                    if(j >= defaultdata.crews.length -1) {
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
            for (i = 0; i < defaultdata.engines.length; i = i + 1) {
                defaultdata.mods.createEngine(req.app.plugins.shipgen.models, i, defaultdata.engines[i], function(j) {
                    if(j >= defaultdata.engines.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.hulls.length; i = i + 1) {
                defaultdata.mods.createHull(req.app.plugins.shipgen.models, i, defaultdata.hulls[i], function(j) {
                    if(j >= defaultdata.hulls.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.shields.length; i = i + 1) {
                defaultdata.mods.createShield(req.app.plugins.shipgen.models, i, defaultdata.shields[i], function(j) {
                    if(j >= defaultdata.shields.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.weapons.length; i = i + 1) {
                defaultdata.mods.createWeapon(req.app.plugins.shipgen.models, i, defaultdata.weapons[i], function(j) {
                    if(j >= defaultdata.weapons.length -1) {
                        cb(null);
                    }
                });
            }
        },
        function (cb) {
            for (i = 0; i < defaultdata.sensors.length; i = i + 1) {
                defaultdata.mods.createSensor(req.app.plugins.shipgen.models, i, defaultdata.sensors[i], function(j) {
                    if(j >= defaultdata.sensors.length -1) {
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
        ShipClass = models.shipClass,
        Fleet = models.fleet,
        Crew = models.crew,
        Slot = models.slot,
        mods = models.mods;

    async.parallel([
        function (cb) {
            Ship.remove(function () {
                console.log('destroyed all ships');
                cb();
            });
        },
        function (cb) {
            ShipClass.remove(function () {
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
