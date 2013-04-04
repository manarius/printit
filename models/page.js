"use strict";

var mongoose = require('mongoose');

module.exports = function(app) {
    // define models
    var pageSchema = new app.Schema({
        title:     { type: String, length: 255 },
        slug:      { type: String, length: 255 },
        content:   { type: String, length: 500 },
        footer:    { type: String, length: 255 },
        author:    { type: String, length: 25 },
        date:      { type: Date,    default: Date.now },
        updated:   { type: Date,    default: Date.now },
        published: { type: Boolean, default: false, index: true },
        meta:      { type: Object }
    });
    
    return mongoose.model('Page', pageSchema);

}
