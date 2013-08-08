"use strict";

module.exports = function (app) {
    app.post('/contact',  app.controllers.posts.contact);

    app.post('/setup', app.controllers.posts.setup);

    app.post('/deleteAll', app.controllers.posts.deleteAll);
};
