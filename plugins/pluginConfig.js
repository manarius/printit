"use strict";

var fs = require('fs'),
    path = require('path'),
    load = require('express-load');

module.exports = {
    do: function (app, cb) {
        var pluginRoot = path.join(app.rootDir, 'plugins');

        app.set('pluginRoot', pluginRoot);

        fs.readdir(pluginRoot, function (err, dirs) {
            var i = 0,
                directories = [];

            for (i = 0; i < dirs.length; i = i + 1) {

                if (dirs[i].indexOf('.') < 0) {
                    directories.push(dirs[i]);
                }
            }

            app.set('pluginDirs', directories);

            if (typeof cb === 'function') {
                cb();
            }
        });
    },

    load: function (app, cb) {
        var pluginDirs = app.get('pluginDirs'),
            pluginIdx = '',
            setupPath = '',
            p, i, 
            j = 0;

        for (i = 0; i < pluginDirs.length; i = i + 1) {

            p = path.join('plugins', pluginDirs[i]);

            fs.exists(p, function (exists) {
                p = path.join('plugins', pluginDirs[j]);
                j = j + 1;
                
                if (exists) {
                    load(path.join(p, 'config')/*, {verbose: true}*/)
                        .then(path.join(p, 'models/class.js'))
                        .then(path.join(p, 'models/slot.js'))
                        .then(path.join(p, 'models/mods'))
                        .then(path.join(p, 'models/meta'))
                        .then(path.join(p, 'models/fleet.js'))
                        .then(path.join(p, 'models/people'))
                        .then(path.join(p, 'models/ship.js'))
                        .then(path.join(p, 'models'))
                        .then(path.join(p, 'controllers'))
                        .then(path.join(p, 'routes'))
                        .into(app);

                    //~ setupPath = path.join(app.rootDir, p, 'setup.js');

                    //~ if (fs.existsSync(setupPath)) {
                        //~ require(setupPath).do(app);
                    //~ }
                }
                
                if ( j >= pluginDirs.length && typeof cb === 'function') {                    
                    //~ console.log('exists = '+exists + ' j = '+ j + 'plugindirs.length = ' + pluginDirs.length );
                    cb();
                }
            });
        }
    }
};
