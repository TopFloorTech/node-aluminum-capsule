/**
 * Created by BMcClure on 9/17/2016.
 */
var modernizr = require('gulp-modernizr');
var appRootDir = require('app-root-dir').get();
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

module.exports = function (gulp, config) {
    gulp.task('modernizr', function () {
        if (!config.modernizr.enabled) {
            return;
        }

        var options = config.modernizr.options || {};

        var sources = config.modernizr.sources || [
                appRootDir + '/src/js/**/*.js',
                appRootDir + '/src/scss/**/*.scss',
                appRootDir + '/js/**/*.js',
                '!' + appRootDir + '/js/modernizr.js'
            ];

        var destination = config.modernizr.dest || appRootDir + '/js';

        gulp.src(sources)
            .pipe(modernizr(options))
            .pipe(uglify())
            .pipe(gulp.dest(destination))
            .pipe(notify({
                title: "Modernizr Generated",
                message: "A custom Modernizr file has been generated.",
                onLast: true
            }));
    });
};
