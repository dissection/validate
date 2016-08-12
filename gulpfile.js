var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src("./validate-2.0.0.js")
        .pipe(rename({basename: "validate",suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src'));
});
