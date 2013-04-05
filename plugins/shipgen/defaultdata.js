"use strict";

/*
 * categories:
 * hq
 * common
 * elite
 * charge
 * heavy
 * 
 */

module.exports = {
    fleets: require('./defaultdata/fleets.js'),
    ships: require('./defaultdata/ships.js'),
    shipclasses: require('./defaultdata/shipclasses.js'),
    slots: require('./defaultdata/slots.js'),
    crews: require('./defaultdata/crews.js'),

    weapons: require('./defaultdata/weapons.js'),
    shields: require('./defaultdata/shields.js'),
    engines: require('./defaultdata/engines.js'),
    hulls: require('./defaultdata/hulls.js'),
    sensors: require('./defaultdata/sensors.js'),
    
    createShip: require('./defaultdata/create/ship.js'),
    createCrew: require('./defaultdata/create/crew.js'),
    createFleet: require('./defaultdata/create/fleet.js'),
    createClass: require('./defaultdata/create/class.js'),
    createSlot: require('./defaultdata/create/slot.js'),

    mods: {
        createEngine: require('./defaultdata/create/mods/engine.js'),
        createHull: require('./defaultdata/create/mods/hull.js'),
        createShield: require('./defaultdata/create/mods/shield.js'),
        createSensor: require('./defaultdata/create/mods/sensor.js'),
        createWeapon: require('./defaultdata/create/mods/weapon.js'),
        createGenerator: require('./defaultdata/create/mods/generator.js')
    }
};
