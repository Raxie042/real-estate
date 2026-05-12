const path = require('path');
const fs = require('fs');

module.exports = function(options, webpack) {
  const baseExternals = Array.isArray(options.externals)
    ? options.externals
    : options.externals
    ? [options.externals]
    : [];

  return {
    ...options,
    externals: [
      ...baseExternals,
      { '@mapbox/node-pre-gyp': 'commonjs2 @mapbox/node-pre-gyp' },
      { 'node-pre-gyp': 'commonjs2 node-pre-gyp' },
      { 'passport-linkedin-oauth2': 'commonjs2 passport-linkedin-oauth2' },
      { 'passport-microsoft': 'commonjs2 passport-microsoft' },
      { 'passport-google-oauth20': 'commonjs2 passport-google-oauth20' },
      { 'passport-apple': 'commonjs2 passport-apple' },
      { 'passport-local': 'commonjs2 passport-local' },
      { 'passport-jwt': 'commonjs2 passport-jwt' },
    ],
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /^mock-aws-s3$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^nock$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /@mapbox\/node-pre-gyp/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /node-pre-gyp/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /\.html$/,
      }),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('PackageJsonPlugin', () => {
            const src = path.join(__dirname, 'package.json');
            const dest = path.join(__dirname, 'dist', 'package.json');
            if (fs.existsSync(src)) {
              fs.copyFileSync(src, dest);
            }
          });
        },
      },
    ],
  };
};
