module.exports = {
  paths: {
    src: '/open-archive/sample/*/*.xml', // gulp.src arg
    dest: '/open-archive/enriched', // gulp.dest arg
  },
  services:{
    textrazor: {
      apiKey: '', // override api key in localsettings
    },
    babelfy:{
      key: ''
    }
  }
}