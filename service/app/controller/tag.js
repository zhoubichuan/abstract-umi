/**
 * Created by Administrator on 2018/5/14.
 */
'use strict';
const BaseController = require('./base');

module.exports = class CategoriesController extends BaseController {
  // 查询分类
  async get() {
    try {
      await this.getPager({
        modName: 'Tag',
        returnFields: ['name'],
      });
    } catch (error) {
      this.error(error);
    }
  }
  async create() {
    const {
      ctx,
    } = this;
    const Tag = ctx.request.body;
    try {
      let doc = await ctx.model.Tag.findOne(Tag);
      if (doc) {
        this.error('此分类已存在！');
      } else {
        doc = await ctx.model.Tag.create(Tag);
        this.success('保存分类成功');
      }
    } catch (error) {
      this.error(error);
    }
  }
  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const Tag = ctx.request.body;
    try {
      const result = await ctx.model.Tag.findByIdAndUpdate(id, Tag);
    } catch (error) {
      this.error(error);
    }
  }
  async delete() {
    const {
      ctx,
    } = this;
    // 能够同时支持删除一条和批量删除
    const id = ctx.params.id;
    const {
      ids = [],
    } = ctx.request.body;
    ids.push(id);
    try {
      await ctx.model.Tag.remove({
        _id: {
          $in: ids,
        },
      });
      this.success('删除成功');
    } catch (error) {
      this.error(error);
    }
  }
};