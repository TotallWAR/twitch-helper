'use strict';
let request = require('koa2-request');
let twitchEndpoint = require('../../config/apiEndpoints');
let twitchAuth = require('../../config/auth/stratagies/twitch');

/**
 * Возвращает все видео данного канала
 * @type {String} channelName уникальное имя канала
 */
exports.getChannelVideos = async(channelName) => {
  try {
    let channelID = await translateUserNameToUserId(channelName);
    if (!channelID) {
      return null;
    }
    let twitch_videos = twitchEndpoint.twitch_videos;
    let url = twitchEndpoint.twitch + `${twitch_videos}`;
    url = url.replace('${channelID}', channelID);
    var options = {
      url: url,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        'content-type': 'application/json',
        'charset': 'UTF-8',
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': twitchAuth.twitchClientId
      },
      json: true
    };
    var result = await request(options);
    if (!result.body.videos.length) {
      return null;
    }
    return result.body.videos;
  } catch (e) {
    return null;
  }
};

let translateUserNameToUserId = async(userName) => {
  try {
    var options = {
      url: twitchEndpoint.translateUserNameEndpoint + userName,
      method: 'get',
      headers: {
        'User-Agent': 'request',
        'content-type': 'application/json',
        'charset': 'UTF-8',
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': twitchAuth.twitchClientId
      },
      json: true
    };
    var result = await request(options);
    if (result.body.users) {
      return result.body.users[0]._id;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
