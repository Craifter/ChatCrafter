const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const tailwindcss = require('tailwindcss')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

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
}]

const OPTIONS = {
  MANIFEST: './src/manifest.json',
  SERVICE_WORKER: './src/service-worker.ts',
  CHAT_GPT: './src/chat-gpt.ts',
  DIST: path.join(__dirname, 'dist')
}

const entry = {
  'service-worker': OPTIONS.SERVICE_WORKER,
  'chat-gpt': OPTIONS.CHAT_GPT
}

const chunksDisabledForChunkSplitting = ['service-worker', 'chat-gpt']

PAGES.forEach((page) => {
  entry[page.chunk] = page.entry
})

/**
 * Plugin for analyze bundle if analyze flag is set
 */
class AnalyzerPlugin {
  apply (compiler) {
    if (!compiler.options.analyze) {
      return
    }
    console.log('asdasdadsadsad')
    compiler.hooks.afterPlugins.tap('AnalyzerPlugin', (compiler) => {
      compiler.options.plugins.push(new BundleAnalyzerPlugin())
    })
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    entry,
    mode: isProduction ? 'production' : 'development',
    devtool: false,
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
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
      },]
    },
    plugins: [new CopyPlugin({
      patterns: [{
        from: OPTIONS.MANIFEST,
        to: 'manifest.json'
      }, {
        from: './src/assets',
        to: 'assets'
      }]
    }), new MiniCssExtractPlugin(), ...getHtmlPlugins(PAGES), new AnalyzerPlugin(), new MiniCssExtractPlugin()],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: OPTIONS.DIST,
      filename: '[name].js'
    },
    optimization: {
      minimize: isProduction,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin({
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
                params: {
                  overrides: {
                    removeViewBox: false,
                    addAttributesToSVGElement: {
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' },],
                      },
                    },
                  },
                },
              },],
            },],],
          },
        },
      }),],
      splitChunks: {
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
      }
    },
    performance: {
      maxEntrypointSize: 500000,
    },
  }
}

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
  }))
}
