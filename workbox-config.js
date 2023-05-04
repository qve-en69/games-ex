module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{html,png,svg,json,txt,js}'
  ],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
    /^fbclid$/
  ]
}
