var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src("./validate.js")
        .pipe(rename({basename: "validate",suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src'));
});
