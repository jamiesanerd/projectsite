var http = require('http');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var refresh = require('gulp-livereload');
var minifyCSS = require('gulp-clean-css');
var embedlr = require('gulp-embedlr');
var ecstatic = require('ecstatic');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('scripts', function() {
    return gulp.src(['app/src/**/*.js'])
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('dist/build'))
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return gulp.src(['app/css/main.scss'])
        .pipe(scss())
        .on('error', console.log)
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    return browserSync.init({
        server: "dist/",
        port: 5005,
        ui: {
          port: 8080
        }
    })
});


gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
})

gulp.task('assets', function() {
    return gulp.src("app/assets/**")
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/assets/'))
        .pipe(browserSync.stream());
});

// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    gulp.watch('app/src/**', ['scripts']);
    gulp.watch('app/css/**', ['styles']);
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/assets/**', ['assets']);
});

gulp.task('default', ['scripts', 'styles', 'html', 'assets', 'serve', 'watch']);
