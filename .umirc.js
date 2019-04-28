// ref: https://umijs.org/config/
const debugLocal = false;
const targetSysUrl = debugLocal
  ? 'http://192.168.1.154:9000'
  : 'http://118.190.154.11:3000/mock/34';
const targetApiUrl = debugLocal
  ? 'http://192.168.1.154:9000'
  : 'http://118.190.154.11:3000/mock/34';
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        dynamicImport: false,
        title: 'demo',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: true }]],
  disableCSSModules:true,
  proxy: {
    '/api/sys': {
      target: targetSysUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/sys': {
      target: targetSysUrl,
      changeOrigin: true,
    },
    '/api': {
      target: targetApiUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
