/**
 * Created by Administrator on 2018/5/14.
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const CategorySchema = new Schema({
    name: String,
    tags: String,
    descript: String,
    creator: String,
    createTime: {
      type: Date,
      default: Date.now,
    },
    updater: String,
    updateTime: {
      type: Date,
      default: Date.now,
    },
  });
  const Category = mongoose.model('Category', CategorySchema);
  return Category;
};