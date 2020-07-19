require('ignore-styles');

require('@babel/register')({
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': {
          'node': 'current'
       }
      }
    ],
    '@babel/preset-react'
  ],
  'plugins': [
    '@babel/plugin-transform-modules-commonjs',
    // [
    //   'transform-assets',
    //   {
    //     'extensions': [
    //       'css',
    //       'svg'
    //     ],
    //     'name': 'static/media/[name].[hash:8].[ext]'
    //   }
    // ]
  ]
});

require('./app.js');