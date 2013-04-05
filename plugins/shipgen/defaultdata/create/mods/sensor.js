"use strict";

module.exports = function createSensor(models, i, dd, cb) {
    var Sensor = models.mods.sensor,
        ShipClass = models.shipClass;
    
    if (!dd) {
        throw 'createSensor was called without a defaultdata object';
    }

    if (!dd.slug || !dd.name) {
        throw 'createSensor was called without a slug or a name in the defaultdata object';
    }

    Sensor.findOne({slug: dd.slug}).exec(function (err, obj) {
        obj = obj || new Sensor();

        obj.name = dd.name;
        obj.slug = dd.slug;
        obj.published = dd.published || true;
        obj.category = dd.category || '';
        
        obj.desc = dd.desc;
        obj.excerpt = dd.excerpt;

        obj.range = dd.range || 10;
        obj.ecm = dd.ecm || 1;
        obj.eccm = dd.eccm || 1;
        
        obj.consume = dd.consume || 1;
        
        obj.size = dd.size || 1;

        obj.cost = dd.cost || 1;
        
        ShipClass.findOne({slug: dd.class}).exec(function(err, cl) {
            obj.class = cl._id;
            
            obj.save(function (err, savedObj) {
                if(err) {
                   console.log(' err = ' + err); 
                }

                console.log('sensor saved ' + savedObj.slug);
            
                if (typeof cb === 'function') {
                    cb(i);
                }
            });
        });
    });
}
