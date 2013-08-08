'use strict';

var nodemailer = require('nodemailer'),
    mail = 'microcmsmailtest@gmail.com'; //your mail address the contact page should use

module.exports = {
    name      : 'shipgen',             // name of this app
    author    : 'printit team',        //your name or the name of your company
    title     : 'printit',        //the page title will be used in the <title> tag and instead of the logo.
    branding  : 'games that matter.',
    logo      : '',                 //leave blank or set to false to use the title instead
    protocol  : 'http://',          //http or https
    url       : 'pvpvz.com',                        //url this app can be reached at 
    version   :  '0.0.1',                           //the version number of this application.
    port      : 2323,                               //the port this runs on
    email     : mail,                               //your mail address the contact page should use
    smtp      : nodemailer.createTransport(
      'SMTP', {//setup nodemailer
        service: 'Gmail',                           //uses gmail as default, see the nodemailer docs for other options
        auth: {
            user: mail,                             //the email your smtp server should use to forward the mails from the contact page
            pass: 'microcmspassword'                //the password of your smtp server
        }
    }),
    theme     : 'printit',                          //the dirname of the defaulttheme
    themeMap  : {
        dev: 'printit',
        localhorst: 'printit'
    }
};
