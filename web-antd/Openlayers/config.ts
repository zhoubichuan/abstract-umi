let { ffarmRespVO } = JSON.parse(localStorage.getItem('userInfo') || '{}');
export default {
  code: ffarmRespVO?.code || 'sanshui',
  token:
    JSON.parse(localStorage.getItem('auth') || '{}')?.access_token ||
    '035d65cb-876c-4505-b97f-75a97908fbf1',
  map: {},
  view: {},
  layer: {},
  source: {},
  control: {
    scaleLine: true,
  },
};
