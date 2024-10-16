const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
 
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://api.themoviedb.org/3/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'themoviedb-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://image.tmdb.org/t/p/w500/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'themoviedb-image-api',
          },
        },
      ],
    }),
  ],
};