require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'react',
    'stage-0',
    'flow',
  ],
})
require('./renderToFile.js')
