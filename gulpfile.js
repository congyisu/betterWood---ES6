var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var webpack = require('webpack');
var config = require('./webpack.config.js');

//compile sass to css use gulp-sass
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

//create dev server
gulp.task('server', ['sass'], function () {
    return gulp.src('./')
        .pipe(server({
            open: 'src/html/index.html',
            directoryListing: true,
            livereload: true,
            port: 8080
        }))
});

gulp.task('watch', function () {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/html/*.html');
    gulp.watch('src/js/*.js', ['webpack']);
    gulp.watch('src/component/*.js', ['webpack']);
});

gulp.task('webpack', function (callback) {
    webpack(config).run(function (err, stats) {
        callback();
    });
});

gulp.task('default', ['server', 'watch'])

