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
    distdir = 'dist',
    democss = ['assets/css/demo.less'],
    democss_output = 'assets/css',
    compression = {
        outSourceMaps: true,
        output: {
            max_line_len: 150
        }
    };

gulp.task('build', function () {
    return gulp.src(srcfiles)
        .pipe(concat('jquery.beforeafter.min.js'))
        .pipe(uglify(compression))
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
    gulp.watch('src/*.js', ['build']);
    gulp.watch('assets/css/*.less', ['build-demo']);
});

gulp.on('err', function (err) {
    console.log(err);
});

gulp.task('default', ['build', 'build-demo']);
