//include gulp
var gulp = require("gulp");
// Include  plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');

 // cnvert es6 code to es5

 gulp.task('js', function () {
    return browserify('es6/test.js')
        .transform('babelify', {
            presets: ['env']
        })
        .bundle()
        .pipe(source('app.js')) // Converts To Vinyl Stream
        .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
        // Gulp Plugins Here!
        .pipe(gulp.dest('js/'));
});

 // Concatenate and minify JS Files
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});
//minify images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('es6/test.js', ['js']);
   // Watch .js files
  gulp.watch('js/*.js', ['scripts']);
   // Watch .css files
  gulp.watch('css/*.css', ['minify-css']);
   // Watch image files
  gulp.watch('img/**/*', ['images']);
 });

 // Default Task
gulp.task('default', ['js','scripts','minify-css', 'images', 'watch']);