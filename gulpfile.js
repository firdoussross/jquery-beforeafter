/**
 *
 * Gulpfile.js
 *
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    srcfiles = [
              'src/main.js'
          ],
    distdir = 'dist',
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

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['build']);
});

gulp.on('err', function (err) {
    console.log(err);
});

gulp.task('default', ['build']);
