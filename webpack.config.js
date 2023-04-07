const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

/**
 * @type {[{template: string, entry: string, chunk: string}]}
 */
const PAGES = [
    {
        entry: './src/popup/popup.tsx',
        chunk: 'popup',
        template: './src/popup/popup.html',
    },
    {
        entry: './src/options/options.tsx',
        chunk: 'options',
        template: './src/options/options.html',
    }
];

const OPTIONS = {
    MANIFEST: './src/manifest.json',
    SERVICE_WORKER: './src/service-worker.ts',
    CHAT_GPT: './src/chat-gpt.ts',
    DIST: path.join(__dirname, 'dist'),
};

const entry = {
    service_worker: OPTIONS.SERVICE_WORKER,
    'chat-gpt': OPTIONS.CHAT_GPT,
}

PAGES.forEach((page) => {
    entry[page.chunk] = page.entry
})

module.exports = {
    entry: entry,
    mode: 'development',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { noEmit: false },
                        }
                    }],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: OPTIONS.MANIFEST, to: 'manifest.json' },
            ],
        }),
        ...getHtmlPlugins(PAGES),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: OPTIONS.DIST,
        filename: '[name].js',
    },
};

/**
 *
 * @param {object[]} elements
 * @param {string} elements.chunk Chunk name
 * @param {string} elements.template Template path
 * @return {*}
 */
function getHtmlPlugins(elements) {
    return elements.map(
        (element) =>
            new HTMLPlugin({
                title: 'React extension',
                filename: `${element.chunk}.html`,
                chunks: [element.chunk],
                template: element.template,
            })
    );
}
