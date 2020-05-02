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
    creator: {
      type: ObjectId,
      ref: 'User',
    },
    createTime: {
      type: Date,
      default: Date.now,
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
  });
  const Category = mongoose.model('Category', CategorySchema);
  return Category;
};