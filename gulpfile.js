var $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    minifyCSS = require('gulp-minify-css'),
    minify = require('gulp-minify');

//Paths
var P = {
    assets: [
        './css/*.*',
        './js/*.*',
        './SCSS/*.*'
    ],
    // Sass will check these folders for files when you use @import.
    sass: [
        './SCSS/*.*'
    ],
    js:[
        './js/*.*'
    ],
    dest: [
        './css'
    ],
        watch: ['./css/**/*.css', './js/**/*.js'],
        browserSyncUrl: 'http://localhost:63342/MW-POC/index.html'
};

//Error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError("Error: <%= error.message %>") };


//Compass task
gulp.task('mw-compass', function() {
   return gulp.src(P.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe($.sass({
            includePaths: P.sass,
            ignoreFiles: ['.css', '.css.map'],
            errLogToConsole: true
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css'))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        });
});

//Compress JS

gulp.task('compressJS', function() {
    return gulp.src(P.js)
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./min'))
});

//Watch compass
gulp.task('mw-compass-watch', function () {
    gulp.watch(P.sass, ['mw-compass']);
});

//Watch compass and live reload
gulp.task('mw-develop', function () {
    browserSync.init({
        proxy: P.browserSyncUrl
    });

    gulp.watch(P.sass, ['mw-compass']);

    gulp.watch(P.watch, function(e){
        gulp.src(e.path)
            .pipe(plumber(plumberErrorHandler))
            .pipe(browserSync.stream())
            .pipe(notify(
                e.path.replace(__dirname, '').replace(/\\/g, '/') + ' changed/reloaded'
            ));
    });
});

//Task for compiling scss and js
gulp.task('default', ['mw-compass','compressJS']);
