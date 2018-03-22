module.exports = {
  plugins: [
    /* eslint-disable */
    require('postcss-import'),
    require('postcss-cssnext')({
      features: {
        customProperties: {
          preserve: true,
          warnings: false,
        },
      },
    }),
    require('postcss-nested'),
    /* eslint-enable */
  ],
}
