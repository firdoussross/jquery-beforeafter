/**
 *
 * Gulpfile.js
 *
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    srcfiles = ['src/main.js'],
    srccss = ['src/styles.less'],
    distdir = 'dist',
    democss = ['assets/css/demo.less'],
    democss_output = 'assets/css',
    compression = {
        outSourceMaps: true,
        output: {
            max_line_len: 150
        }
    };

gulp.task('build-js', function () {
    return gulp.src(srcfiles)
        .pipe(concat('jquery.beforeafter.min.js'))
        .pipe(uglify(compression))
        .pipe(gulp.dest(distdir));
});

gulp.task('build-css', function () {
    return gulp.src(srccss)
        .pipe(less())
        .pipe(concat('jquery.beforeafter.min.css'))
        .pipe(csso())
        .pipe(gulp.dest(distdir));
});

gulp.task('build-demo', function () {
    return gulp.src(democss)
        .pipe(less())
        .pipe(concat('demo.styles.css'))
        .pipe(csso())
        .pipe(gulp.dest(democss_output));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['build-js']);
    gulp.watch('src/*.less', ['build-css']);
    gulp.watch('assets/css/*.less', ['build-demo']);
});

gulp.on('err', function (err) {
    console.log(err);
});

gulp.task('default', ['build-js', 'build-css', 'build-demo']);
