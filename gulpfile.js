const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpMinifyCss = require('gulp-minify-css');
const gulpRev = require('gulp-rev');
const gulpRevCollector = require('gulp-rev-collector');
const contentIncluder = require('gulp-content-includer');
const browserify = require('browserify');
const babelify = require('babelify');
const vinylsource = require('vinyl-source-stream');
const vinylbuffer = require('vinyl-buffer');
const del = require('del');

gulp.task('default', [
  'install-lib',
  'install-pie',
  'build-image',
  'install-index'
], (cb) => {
  del([
    './dist/js/bundle.js',
    './dist/css/bundle.min.css',
    './dist/components.html',
    './dist/pages.html'
  ], cb);
});

gulp.task('clean', cb => {
  return del([
    './dist/**'
  ], cb);
});

gulp.task('install-index', ['clean', 'generate-rev', 'build-components', 'build-pages'], () => {
  return gulp.src([
    './dist/rev-manifest.json',
    './index.html'
  ])
  .pipe(gulpRevCollector())
  .pipe(contentIncluder({
    includerReg: /<%[ ]*include\s+"([^"]+)"[ ]*%>/g
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('generate-rev', ['clean', 'build-js', 'build-css'], () => {
  return gulp.src([
    './dist/js/bundle.js',
    './dist/css/bundle.min.css',
  ], {
    base: './dist'
  })
  .pipe(gulpRev())
  .pipe(gulp.dest('./dist'))
  .pipe(gulpRev.manifest())
  .pipe(gulp.dest('./dist'));
});

gulp.task('install-lib', ['clean'], () => {
  return gulp.src('./lib/js/**/*.js')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-js', ['clean'], () => {
  return browserify({
    entries: './src/index.js'
  })
  .transform(babelify, {
    presets: [
      'env',
      'es2015',
      'stage-2'
    ],
    plugins: ['transform-runtime'],
    comments: false,
  })
  .bundle()
  .pipe(vinylsource('bundle.js'))
  .pipe(vinylbuffer())
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-css', ['clean'], () => {
  return gulp.src([
    './lib/css/*.css',
    './src/common/css/*.css',
    './src/components/**/*.css',
    './src/pages/**/*.css'
  ])
  .pipe(gulpConcat('bundle.min.css'))
  .pipe(gulpMinifyCss())
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-components', ['clean'], () => {
  return gulp.src([
    './src/components/**/*.html'
  ])
  .pipe(gulpConcat('components.html'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build-pages', ['clean'], () => {
  return gulp.src([
    './src/pages/**/*.html'
  ])
  .pipe(gulpConcat('pages.html'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('install-pie', ['clean'], () => {
  return gulp.src([
    './lib/css/pie.htc'
  ])
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-image', ['clean'], () => {
  return gulp.src([
    './assets/img/**/*.png',
  ])
  .pipe(gulp.dest('./dist/img'));
});
