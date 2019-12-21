const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const uncss = require('gulp-uncss');


// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('images/**/*')
    .pipe(imageMin([
        imageminWebp({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist/img'))
);

// Minify CSS
gulp.task('cleancss', async function () {
    gulp.src('css/*.css')
        .pipe(cleancss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('minify', async function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

// Copying Fonts to Dist
gulp.task('fonts', function () {
    return gulp.src('webfonts/**/*')
        .pipe(gulp.dest('dist/webfonts'))
})

// Remove unused CSS
gulp.task('uncss', async function () {
    gulp.src('css/*.css')
        .pipe(uncss({
            html: ['index.html', '/*.html']
        }))
        .pipe(cleancss())
            .pipe(rename({
                suffix: '.min'
            }))
        .pipe(gulp.dest('dist/css'));
});