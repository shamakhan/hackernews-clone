require('ignore-styles');
require('@babel/polyfill');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: [
    ['@babel/preset-env',
      {
        modules: 'commonjs',
        // useBuiltIns
      }
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    'dynamic-import-node',
    '@babel/plugin-transform-modules-commonjs'
  ]
});

require('./app');


