'use strict';
let twitchController = require('../controllers/twitch.controller.js');
module.exports = (app, route, passport) => {
  route.get('/getMoviesByChannelId/:channelId', async(ctx, next) => {
    await twitchController.getMoviesByChannelId(ctx, next);
  });
};
