const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/* config-overrides.js */
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.plugins = [
        ...config.plugins,
        new MonacoWebpackPlugin([ 'json', 'sql', 'xml', 'markdown' ])
    ]

    return config;
}