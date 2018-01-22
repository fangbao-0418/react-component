var gulp = require('gulp')
const webpack = require('webpack')
const rimraf = require('rimraf')
var stylus = require('gulp-stylus')
var gulpSequence = require('gulp-sequence')
var babel = require('gulp-babel')

gulp.task('dist', function (done) {
  rimraf.sync('./dist')
  const webpackConfig = require('./webpack.prod.config')
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    })
    done(0)
  })
})

gulp.task('stylus', function (done) {
  gulp.src('components/**/*.styl')
    .pipe(stylus()).pipe(gulp.dest('.tmp'))
  done(0)
})

gulp.task('autoprefix', function () {
  var postcss = require('gulp-postcss')
  var autoprefixer = require('autoprefixer')
  return gulp.src('.tmp/**/*.css')
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('lib'))
})

// 编译ts
gulp.task('ts', function () {
  var ts = require('gulp-typescript')
  var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true })
  gulp.src('components/**/*.tsx')
    .pipe(tsProject())
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

// 编译js
gulp.task('js', function () {
  gulp.src('components/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})

gulp.task('css', ['stylus', 'autoprefix'])
gulp.task('lib', function (cb) {
  rimraf.sync('lib')
  gulpSequence(['js', 'ts'], cb)
})
