const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const tailwindcss = require('tailwindcss')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

/**
 * @type {[{template: string, entry: string, chunk: string}]}
 */
const PAGES = [
  {
    entry: './src/popup/popup.tsx',
    chunk: 'popup',
    template: './src/popup/popup.html'
  },
  {
    entry: './src/options/options.tsx',
    chunk: 'options',
    template: './src/options/options.html'
  }
]

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

PAGES.forEach((page) => {
  entry[page.chunk] = page.entry
})

/**
 * Plugin for analyze bundle if analyze flag is set
 */
class AnalyzerPlugin {
  apply(compiler) {
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
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: { noEmit: false }
              }
            }],
          exclude: /node_modules/
        },
        {
          exclude: /node_modules/,
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    tailwindcss('./tailwind.config.js'),
                    require('autoprefixer')
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: OPTIONS.MANIFEST, to: 'manifest.json' }
        ]
      }),
      new MiniCssExtractPlugin(),
      ...getHtmlPlugins(PAGES),
      new AnalyzerPlugin(),
      new MiniCssExtractPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: OPTIONS.DIST,
      filename: '[name].js'
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all'
      }
    },
    performance: {
      maxEntrypointSize: 500000,
    }
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
  return elements.map(
    (element) =>
      new HTMLPlugin({
        title: 'React extension',
        filename: `${element.chunk}.html`,
        chunks: [element.chunk],
        template: element.template,
        inject: 'head'
      })
  )
}
