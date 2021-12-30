const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const combineMq = require('gulp-combine-mq');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const jsImport = require('gulp-js-import');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

gulp.task('styles', function() {
    return gulp.src('resources/styles/main.scss')
        .pipe( sass().on('error', sass.logError) )
	.pipe(sourcemaps.init())
        .pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
        .pipe(combineMq({beautify: false}))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('assets/custom-styles'))
        .pipe(cleanCss())
        .pipe(gulp.dest('assets/custom-styles'))
        .pipe(livereload())
        //.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('icons', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('assets/webfonts/'));
});

gulp.task('scripts', function () {
    return gulp.src('resources/scripts/main.js')
        .pipe(jsImport({hideConsole: false}))        
        .pipe(rename('scripts.js'))        
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on('error', console.error.bind(console))                
        .pipe(uglify())
        .pipe(gulp.dest('assets'))
});

gulp.task('images', function() {
    return gulp.src('resources/assets/**/*')
        .pipe(newer('assets'))
        .pipe(imagemin())
        .pipe(gulp.dest('assets'))
        //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('resources/styles/**/*.scss', ['styles']);
    gulp.watch('resources/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'images', 'icons']);
