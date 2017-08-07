'use strict';
let twitchService = require('../services/twitch.service.js');

exports.getMoviesByChannelId = async(ctx, next) => {
  try {
    let res = await twitchService.getChannelVideos(ctx.params.channelId);
    if (res) {
      ctx.status = 200;
      ctx.body = res;
    } else {
      ctx.status = 404;
      ctx.body = "Not found"
    }
  } catch (e) {
    ctx.throw(404, "Not Found");
  }
};
