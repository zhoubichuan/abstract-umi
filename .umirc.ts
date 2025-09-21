import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    name: 'My App',
    navTheme: 'light',
    layout: 'mix',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  base: '/abstract-umi/',
  publicPath: '/abstract-umi/',
  outputPath: 'abstract-umi',
  hash: true,
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7005/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '/api' },
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home/index',
    },
    {
      name: '数据类别',
      path: '/category',
      component: './Category/index',
    },
    {
      name: '基础数据',
      path: '/base-data',
      component: './BaseData/index',
    },
    {
      name: '树状数据',
      path: '/tree-data',
      component: './BaseData/index',
    },
    {
      name: '标签',
      path: '/tagManager',
      component: './TagManager/index',
    },
    {
      path: '/user',
      component: './Layouts/index',
      layout: false,
      routes: [
        {
          name: '登录',
          path: '/user/login',
          component: './Login/Login',
        },
        {
          name: '注册',
          path: '/user/register',
          component: './Register/Register'
        },
        {
          name: '忘记密码',
          path: '/user/forget',
          component: './Register/Register',
        },
        {
          name: '修改密码',
          path: '/user/edit',
          component: './Register/Register',
        }
      ],
    },
  ],
  npmClient: 'pnpm',
});

