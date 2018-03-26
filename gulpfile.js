'use strict';

var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  concatJs = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cleanCSS = require('gulp-clean-css'),
  minifyImg = require('gulp-imagemin'),
  browserSync = require('browser-sync'),
  replace = require('gulp-string-replace'),
  reload = browserSync.reload,
  del = require('del');

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    css: 'build/css/*.css'
  }
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9013,
  logPrefix: "Funds test web page"
};

function clean() {
  return del(['build']);
}

function html() {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
}

function js() {
  return gulp.src([path.src.js,
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(rigger())
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    // .pipe(concatJs('scripts.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
}

function styles() {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/font-awesome/css/font-awesome.min.css',
    path.src.style])
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths,
        compress: true
    }))
    .pipe(prefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    // .pipe(concatCss("style.css"))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
}

gulp.task('sass', function () {
  gulp.src('path/to/input.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(gulp.dest('path/to/output.css'));
});

gulp.task('replace', function () {
  gulp.src(path.src.css)
    .pipe(replace('../../../../src/build/img/bg-selected.png', '../../build/img/bg-selected.png'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

function images() {
  return gulp.src(path.src.img)
    .pipe(minifyImg())
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
}

function fonts() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
}

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.styles = styles;
exports.fonts = fonts;
exports.images = images;

var build = gulp.series(clean, gulp.parallel(html, js, styles, fonts, images));
gulp.task('build', build);

gulp.task('webserver', function () {
  browserSync(config);
});

// Default task
gulp.task('default', gulp.series('build','replace'));
