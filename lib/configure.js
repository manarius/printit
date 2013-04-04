"use strict";

var fs = require('fs'),
    express = require('express'),
    load = require('express-load'),
    cons = require('consolidate'),
    swig = require('swig'),
    stylus = require('stylus'),
    path = require('path'),
    slash = require('express-slash');


exports.do = function (app, cb) {
    var config = app.config[app.get('env')],
        confKey;

    for (confKey in config) {
        if (config.hasOwnProperty(confKey)) {
            app.set(confKey, config[confKey]);
        }
    }

    // Configuration
    app.configure(function () {

        var viewPath = path.join(app.rootDir, 'views'),
            staticPathIdx,
            pluginStaticPaths = app.get('pluginStaticPaths');

        app.use(express.compress());

        app.set('views', viewPath); // template directory

        // NOTE: Swig requires some extra setup
        // This helps it know where to look for includes and parent templates
        swig.init({
            root        : viewPath,
            allowErrors : true // allows errors to be thrown and caught by express instead of suppressed by Swig
        //, filters: require('./ejsfilters')
        });

        app.engine('.html', cons.swig);

        app.set('view engine', 'html');

        app.use(express.logger('dev'));

        app.use(stylus.middleware({
            replaceInStylusPath: {rm: '/css', add: ''},
            src: app.rootDir + '/views',
            dest: app.rootDir + '/public',
            compile: function (str, p) {
                return stylus(str)
                    .set('filename', p)
                    .set('compress', true);
                //.use(nib());
            }
        }));


        app.use(express.static(path.join(app.rootDir, 'public')));

        app.use(express.bodyParser());

        app.use(express.methodOverride());

        app.use(function (req, res, next) {

            var domain = req.host,
                fileName,
                currentPath;

            if (typeof req.subdomains !== 'undefined' && typeof req.subdomains[0] === 'string') {
                domain = req.subdomains[0] + '.' + req.host;
            }

            res.locals.theme = app.get('themeMap')[domain] || app.get('themeMap')[req.host] || app.get('theme') || 'mcms';

            app.set('theme', res.locals.theme);

            app.set('domain', domain);

            res.locals.themeRootFile = res.locals.theme + '/index.html';

            res.locals.config = require(path.join(app.rootDir, 'views', res.locals.theme, 'config'));

            next();
        });
        
        for (staticPathIdx = 0; staticPathIdx < pluginStaticPaths.length; staticPathIdx = staticPathIdx + 1) {
            app.use(express.static(pluginStaticPaths[staticPathIdx]));
        }
        
        app.use(express.favicon(path.join(app.rootDir, 'views', app.get('theme'), 'public', 'img', 'favicon.ico')));

        app.use(app.router);
        app.use(slash());
    });


    app.configure('development', function () {
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.configure('production', function () {
        app.use(express.errorHandler());
    });

    if (typeof cb === 'function') {
        cb();
    }
};


exports.createStaticPath = function (app, last, staticPath, cb) {
    var pluginStaticPaths = app.get('pluginStaticPaths') || [];

    fs.exists(staticPath, function (exists) {
        if (exists) {
            pluginStaticPaths.push(staticPath);
        }
        
        if (last) {
            app.set('pluginStaticPaths', pluginStaticPaths);

            cb(null);
        }
    });
}
