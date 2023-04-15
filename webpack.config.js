const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const tailwindcss = require('tailwindcss');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebExtPlugin = import('web-ext-plugin');

/**
 * @type {[{template: string, entry: string, chunk: string}]}
 */
const PAGES = [{
  entry: './src/popup/popup.tsx',
  chunk: 'popup',
  template: './src/popup/popup.html'
}, {
  entry: './src/options/options.tsx',
  chunk: 'options',
  template: './src/options/options.html'
}];

const OPTIONS = {
  SERVICE_WORKER: './src/service-worker.ts',
  CHAT_GPT: './src/chat-gpt.ts',
  DIST: path.join(__dirname, 'dist')
};

const dist = path.join(__dirname, 'dist');

const entry = {
  'service-worker': OPTIONS.SERVICE_WORKER,
  'chat-gpt': OPTIONS.CHAT_GPT
};

const chunksDisabledForChunkSplitting = ['service-worker', 'chat-gpt'];

PAGES.forEach((page) => {
  entry[page.chunk] = page.entry;
});

let vendor = process.env.VENDOR || 'firefox';

module.exports = async (env, argv) => {
  const isProduction = argv.mode === 'production';

  const webExtConfig = {
    sourceDir: dist,
    target: vendor === 'firefox' ? 'firefox-desktop' : 'chromium',
    startUrl: 'https://chat.openai.com/',
    browserConsole: true,
    devtools: true,
    keepProfileChanges: true,
    profileCreateIfMissing: true,
    chromiumProfile: path.join(__dirname, 'profile/chromium'),
    firefoxProfile: path.join(__dirname, 'profile/firefox'),
    runLint: isProduction
  };

  const WEP = (await WebExtPlugin).default;

  const plugins = [new CopyPlugin({
    patterns: [{
      from: './src/assets',
      to: 'assets'
    }]
  }), new MergeJsonWebpackPlugin({
    files: ['./src/manifest.json', vendor === 'firefox' ? './src/manifest.firefox.json' : './src/manifest.chromium.json'],
    output: {
      fileName: 'manifest.json'
    },
  }), new class AnalyzerPlugin {
    apply (compiler) {
      if (!compiler.options.analyze) {
        return;
      }
      compiler.options.plugins = compiler.options.plugins.filter((plugin) => !(plugin instanceof WEP));
      compiler.hooks.afterPlugins.tap('AnalyzerPlugin', (compiler) => {
        compiler.options.plugins.push(new BundleAnalyzerPlugin());
      });
    }
  }(), new WEP(webExtConfig), ...getHtmlPlugins(PAGES), new ForkTsCheckerWebpackPlugin(), new MiniCssExtractPlugin()];

  return {
    entry,
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true,
            compilerOptions: { noEmit: false }
          }
        }],
        exclude: /node_modules/
      }, {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')]
            }
          }
        }]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset'
      }, {
        test: /\.json$/i,
        type: 'asset/resource',
      },]
    },
    plugins: plugins,
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: OPTIONS.DIST,
      filename: '[name].js'
    },
    optimization: {
      minimize: isProduction,
      minimizer: !isProduction ? [] : [new CssMinimizerPlugin(), new JsonMinimizerPlugin(), new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }), new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['gifsicle', { interlaced: true }], ['jpegtran', { progressive: true }], ['optipng', { optimizationLevel: 5 }], ['svgo', {
              plugins: [{
                name: 'preset-default',
              },],
            },],],
          },
        },
      }),],
      splitChunks: !isProduction ? false : {
        chunks: (chunk) => !chunksDisabledForChunkSplitting.includes(chunk.name),
        cacheGroups: {
          reactRouter: {
            test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
            name: 'react-router'
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/](?!@tabler\/icons)[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendors'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      removeEmptyChunks: isProduction,
      removeAvailableModules: isProduction,
    },
    performance: {
      maxEntrypointSize: 500000,
    },
    watchOptions: {
      ignored: /node_modules/
    }
  };
};

/**
 *
 * @param {object[]} elements
 * @param {string} elements.chunk Chunk name
 * @param {string} elements.template Template path
 * @return {*}
 */
function getHtmlPlugins (elements) {
  return elements.map((element) => new HTMLPlugin({
    title: 'ChatCrafter',
    filename: `${element.chunk}.html`,
    chunks: [element.chunk],
    template: element.template,
    inject: 'head'
  }));
}
