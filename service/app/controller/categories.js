/**
 * Created by Administrator on 2018/5/14.
 */
'use strict';
const BaseController = require('./base');

module.exports = class CategoriesController extends BaseController {
  // 查询分类
  async index() {
    try {
      await this.getPager({
        modName: 'Category',
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
    const category = ctx.request.body;
    let {
      name,
      nameEn = ''
    } = category
    try {
      let findName = await ctx.model.Category.findOne({
        name
      });
      let findNameEn = await ctx.model.Category.findOne({
        nameEn
      });
      if (findName) {
        this.error('分类中文名称已存在！');
      } else if (findNameEn) {
        this.error('分类英文名称已存在！');
      } else {
        await ctx.model.Category.create(category);
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
    const category = ctx.request.body;
    try {
      const result = await ctx.model.Category.findByIdAndUpdate(id, category);
      this.success('更新分类成功');
    } catch (error) {
      this.error(error);
    }
  }
  async destroy() {
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
      await ctx.model.Category.remove({
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