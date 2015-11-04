'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('default', ['sass', 'js'], function() {
    require('./app/server');
    return gulp.watch('./client/sass/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./client/sass/index.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./static'));
});

gulp.task('js', function() {
    var b = browserify({
        entries : './client/js/index.js',
        debug : true
    });

    return b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./static/'));
});