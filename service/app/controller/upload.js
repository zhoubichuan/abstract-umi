'use strict';
const BaseController = require('./base');
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
module.exports = class CategoriesController extends BaseController {

  async index() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    const target = path.join(this.config.baseDir, '/api/uploads', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    ctx.body = {
      url: '/api/uploads/' + filename,
    };
  }
};