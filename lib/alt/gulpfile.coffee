gulp = require 'gulp'

browserify = require 'browserify'
sass = require 'gulp-sass'

minify = require 'gulp-minify-css'
plumber = require 'gulp-plumber'
uglify = require 'gulp-uglify'
source = require 'vinyl-source-stream'
streamify = require 'gulp-streamify'
rename = require 'gulp-rename'
notify = require 'gulp-notify'
path = require 'path'
_ = require 'lodash'

rootPath = path.join(__dirname, '../../')
srcRootPath = path.join(__dirname, './')
publicJsPath = path.join(rootPath, './public/js')

onError = (err)->
  console.log(err.toString())
  @emit("end")

gulp.task 'default', ->
  sassWatch = path.join(srcRootPath, 'sass/**/*.sass')

  split = (filePath)->
    _(path.relative(rootPath, filePath).split('/')).drop(3).dropRight(1).value()

  genPath = (dirs, filePath)->
    dirs.concat(split(filePath)).join('/')

  gulp.watch(sassWatch).on 'change', (e) ->
    dest = genPath(['public', 'css'], e.path)

    gulp
    .src e.path
    .pipe plumber()
    .pipe sass(compass: true)
    .pipe minify(keepBreaks: false)
    .pipe gulp.dest(path.join(rootPath, dest))

  gulp.watch('./redux/writer_built/built.js').on 'change', (e) ->
    gulp
    .src e.path
    .pipe rename('writer.min.js')
    .pipe gulp.dest(publicJsPath)
    .pipe notify message: 'complete'

  gulp.watch('./redux/writer_built/writer.js').on 'change', (e) ->
    return
    browserify
      entries: './redux/writer_built/writer.js'
      debug: true
    .bundle()
    .on('error', onError)
    .pipe source('writer.js')
    #.pipe streamify(uglify())
    .pipe rename('writer.min.js')
    .pipe gulp.dest(publicJsPath)
    .pipe notify message: 'complete'
