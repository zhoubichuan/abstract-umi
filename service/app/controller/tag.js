'use strict';
const BaseController = require('./base');
module.exports = class TagController extends BaseController {
  async index() {
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
    const tag = ctx.request.body;
    let {
      name,
      nameEn
    } = tag
    try {
      let findName = await ctx.model.Tag.findOne({
        name
      });
      let findNameEn = await ctx.model.Tag.findOne({
        nameEn
      });
      if (findName) {
        this.error('标签中文名称已存在！');
      } else if (findNameEn) {
        this.error('标签英文名称已存在！');
      } else {
        await ctx.model.Tag.create(tag);
        this.success('保存标签成功');
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
      this.success('更新标签成功');
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