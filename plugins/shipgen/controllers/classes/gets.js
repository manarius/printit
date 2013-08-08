"use strict";

var fs = require('fs'),
    path = require('path');

exports.list = function (req, res, next) {
  var config = req.app.plugins.shipgen.config[req.app.get('env')],
      FrameClass = req.app.plugins.shipgen.models.frameClass,
      where = {
          published: true
      };
  
  FrameClass.find(where).sort('maxSize').exec(function (err, classes) {

    if (!classes || classes.length <= 0) {
        next();
        return;
    }
    
    res.render(req.app.get('theme') + '/shipgen/classes/list', {objects: classes});
  });
};


exports.single = function (req, res, next) {
  var Fleet = req.app.plugins.shipgen.models.fleet,
      FrameClass = req.app.plugins.shipgen.models.frameClass,
      Frame = req.app.plugins.shipgen.models.frame,
      Slot = req.app.plugins.shipgen.models.slot;

  FrameClass.findOne({slug: req.params.slug, published: true}).exec(function (err, cl) {
    if (!cl) {
        next();
        return;
    }
            
    Frame.find({class: cl.id}).exec(function (err, frames) {
        Slot.find({class: cl.id}).exec(function (err, slots) {
            
            res.render(req.app.get('theme') + '/shipgen/classes/single', {object: cl, frames: frames, slots: slots});
        });
    });
  });
}
