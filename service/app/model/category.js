/**
 * Created by Administrator on 2018/5/14.
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CategorySchema = new Schema({
    name: String,
    nameEn: String,
    descript: String,
    descriptEn: String,
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