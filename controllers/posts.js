"use strict";

var path = require('path'),
    form = require('express-form'),
    field = form.field,
    async = require('async'),
    mail = require(path.join(__dirname, '..', 'lib', 'mail'));


function createPage(Page, dd, cb) {
    if (!dd.slug) {
        throw 'createPage was called without a slug in the defaultdata object';
    }

    if (!dd.domain) {
        throw 'createPage was called without a domain in the defaultdata object';
    }

    Page.findOne({slug: dd.slug, domain: dd.domain}, function (err, p) {
        p = p || new Page();

        p.domain = dd.domain || '';
        p.slug = dd.slug || '';
        p.title = dd.title || '';
        p.author = dd.author || '';
        p.content = dd.content || '';
        p.footer = dd.footer  || '';
        p.published = true;
        p.date = new Date().getTime();
        p.updated = new Date().getTime();
        
        p.save(function (err, pa) {
            console.log('page saved ' + pa.slug + ' err = ' + err);
        });
    });
}

// Form filter and validation middleware
exports.contactFormMiddleWare = form(
    field('name').trim().required().isAlphanumeric(),
    field('email').trim().required().isEmail(),
    field('subject').trim().required(),
    field('text').trim().required()
);

exports.contact = function (req, res, next) {
// Express request-handler now receives filtered and validated data
    var errs = [],
        mailSent = false,
        key = '';

    if (!req.form.isValid) {
        // pass errors on to user. this are only form errors, not email errors!
        errs = req.form.errors;
    } else {
        //send mail
        mail.sendMail(req.form, res.locals.config);
        mailSent = true; //XXX this actually says nothing. emails should be logged before sending to make sure they persist.
    }

    res.render(req.app.get('theme') + '/pages/contact', {errs: errs, mailSent: mailSent, name: req.form.name});
};

exports.setup = function (req, res, next) {

    var errs = [],
        defaultdata = require(path.join(req.app.rootDir, 'lib', 'defaultdata.js')),
        i;

    for (i = 0; i < defaultdata.pages.length; i = i + 1) {
        createPage(req.app.models.page, defaultdata.pages[i]);
    }

    res.render(req.app.get('theme') + '/pages/setup', {errs: errs, completed: true});
};


exports.deleteAll = function (req, res) {
    var Page = req.app.models.page;

    async.parallel([
        function (cb) {
            Page.destroyAll(function () {
                console.log('destroyed all pages');
                cb();
            });
        }
    ], function() { //runs after all functions above ran.
        res.render(req.app.get('theme') + '/pages/deleteAll', {completed: true});
    });
};
