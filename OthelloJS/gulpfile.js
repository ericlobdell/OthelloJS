
var gulp = require('gulp');
var minifyCss = require("gulp-minify-css");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var reload = require( 'gulp-livereload' );
var eslint = require( 'gulp-eslint' );

gulp.task('build', function () {
    return gulp.src( ['src/js/models/*.js', 'src/js/*.js'] )
        .pipe(sourcemaps.init())
        .pipe( babel( {
            plugins: ["transform-es2015-modules-systemjs"]
        } ) )
        //.pipe(uglify())
        //.pipe(concat('app.js'))
        .pipe( sourcemaps.write( '.', {
            includeContent: false,
            sourceRoot: '../src'
        } ) )
        .pipe(gulp.dest('dist/js'))
        .pipe(reload());
});

gulp.task("less", function () {
    gulp.src(["src/less/*.less"])
        .pipe(less())
        .pipe(minifyCss({keepBreaks:false}))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(reload());
});

gulp.task("reload", function () {

    gulp.src("./dist/index.html" )
        .pipe(reload());
});

gulp.task("watch", function () {
    reload.listen();

    gulp.watch('src/js/**/*.js', ["lint", "build", "reload"]);
    gulp.watch('src/less/*.less', ["less", "reload"]);
    gulp.watch('tests/spec/*.js', ["reload"]);
    gulp.watch("./index.html", ["reload"]);
} );

gulp.task( 'lint', function () {
    return gulp.src( ['src/js/**/*.js', '!node_modules/**'] )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .pipe( eslint.failAfterError() );
} );

gulp.task("default", function() {
    gulp.start(["lint", "build", "less", "watch"]);
});
