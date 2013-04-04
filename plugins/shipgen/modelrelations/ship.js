"use strict";

exports.do = function (app) {    
    var models = app.plugins.shipgen.models,
        Synopsis = models.meta.synopsis,
        Class = models.class,
        Type = models.type,
        Sensor = models.mods.sensor,
        Weapon = models.mods.weapon,
        Hull = models.mods.hull,
        Shield = models.mods.shield,
        Engine = models.mods.engine,
        Crew = models.mods.crew;

    
    Ship.hasMany(Slot, {as: 'slots', foreignKey: 'fID'});
    Ship.hasMany(Crew, {as: 'crew', foreignKey: 'fID'});
    
    //slots may house any of the mods,
    //which one an individual slot can will be determined by Slot.modType
    Slot.hasMany(Weapon, {as: 'weapons', foreignKey: 'fID'});
    Slot.hasMany(Hull, {as: 'hulls', foreignKey: 'fID'});
    Slot.hasMany(Shield, {as: 'shields', foreignKey: 'fID'});
    Slot.hasMany(Engine, {as: 'engines', foreignKey: 'fID'});
    
    Ship.belongsTo(Class, {as: 'class', foreignKey: 'fID'});

    Ship.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    Crew.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    Slot.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    
    Weapon.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    Hull.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    Shield.hasMany(Class, {as: 'class', foreignKey: 'fID'});
    Engine.hasMany(Class, {as: 'class', foreignKey: 'fID'});

    //adding class relations to basically everything.    
    Class.hasMany(Ship, {as: 'class', foreignKey: 'fID'});
    Class.hasMany(Crew, {as: 'class', foreignKey: 'fID'});
    Class.hasMany(Slot, {as: 'class', foreignKey: 'fID'});
    
    Class.hasMany(Weapon, {as: 'class', foreignKey: 'fID'});
    Class.hasMany(Hull, {as: 'class', foreignKey: 'fID'});
    Class.hasMany(Shield, {as: 'class', foreignKey: 'fID'});
    Class.hasMany(Engine, {as: 'class', foreignKey: 'fID'});

    //adding synopsis relations to basically everything
    Synopsis.belongsTo(Ship, {as: 'synopsis', foreignKey: 'fID'});
    Synopsis.belongsTo(Crew, {as: 'synopsis', foreignKey: 'fID'});
    Synopsis.belongsTo(Slot, {as: 'synopsis', foreignKey: 'fID'});
    
    Synopsis.belongsTo(Weapon, {as: 'synopsis', foreignKey: 'fID'});
    Synopsis.belongsTo(Hull, {as: 'synopsis', foreignKey: 'fID'});
    Synopsis.belongsTo(Shield, {as: 'synopsis', foreignKey: 'fID'});
    Synopsis.belongsTo(Engine, {as: 'synopsis', foreignKey: 'fID'});
}
