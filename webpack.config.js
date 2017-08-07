const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./css/style.css');
module.exports = {
  entry: [path.join(__dirname, 'src/index.js')],
  output: {
    path: path.join(__dirname, '/src/dist'),
    filename: 'bundle.js'
  },
  plugins: [extractCSS],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  'es2015', {
                    modules: false
                  }
                ],
                'react'
              ]
            }
          }
        ]
      }, {
        test: /\.(css|scss|sass)$/,
        use: extractCSS.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
      }
    ]
  }
};
