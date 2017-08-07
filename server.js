'use strict';
const Koa = require('koa');
const CSRF = require('koa2-csrf');
const app = new Koa();
const mongoose = require("./config/mongo.config");
Promise = require("bluebird");

// trust proxy
app.proxy = true;

const db = mongoose();
const appConfig = require("./config/app.config");
//метод конфигурации самого приложения
//задаем различные настройки и модули
const envCfg = appConfig(app, CSRF).envCfg;
// start server
const port = process.env.PORT || envCfg.appPort;
app.listen(port, () => console.log('Server listening on http://localhost:' + port));
