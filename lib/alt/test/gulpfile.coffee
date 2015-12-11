gulp = require 'gulp'
mocha = require 'gulp-mocha'
plumber = require 'gulp-plumber'
istanbul = require 'gulp-coffee-istanbul'
watch = require 'gulp-watch'

src = './test/**/*.coffee'
app = '../src/app/**/*.coffee'

gulp.task 'mocha', ->
  require 'espower-coffee/guess'
  gulp.src(app)
    .pipe istanbul(includeUntested: true)
    .pipe istanbul.hookRequire()
    .on 'finish', ->
      gulp.src src
        .pipe plumber()
        .pipe mocha()
        .pipe istanbul.writeReports()


gulp.task 'default', ->
  watch(src).on 'change', (e) ->
    require 'espower-coffee/guess'
    gulp.src e
      .pipe plumber()
      .pipe mocha()
