const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ASSET_PATH = resolve('./dist');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    globalObject: 'self',
    path: resolve('./public/dist/'),
    publicPath: './dist/',
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      minSize: 100000,
      chunks: 'async',
      cacheGroups: {
        // commons: {
        //   chunks: "initial",
        //   minChunks: 2,
        //   maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //   minSize: 0 // This is example is too small to create commons chunks
        // },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          minChunks: 11,
          // priority: 10,
          // enforce: true
        },
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json', '.styl', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-runtime-helpers': 'vue-runtime-helpers/dist/index.js',
      '@': resolve('src'),
    },
  },

  // devtool: '#eval-source-map',
  performance: {
    hints: false,
  },
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: path.resolve(__dirname, './public'),
    overlay: true,
    compress: true,
    port: 2134,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    require('tailwindcss'),
    require('autoprefixer'),
    new MonacoWebpackPlugin(),
    new ExtractTextPlugin('styles.css', {
      disable: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './dist'),
        to: path.resolve(__dirname, './public/as'),
      },
    ]),
  ],
};