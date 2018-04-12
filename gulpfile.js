const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourceaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const sequence = require('run-sequence');
const babel = require('gulp-babel');

const config = {
	dist: 'dist/',
	src: 'src/',
	cssIn: 'src/css/**/*.css',
	jsIn: 'src/js/**/*.js',
	imgIn: 'src/img/**/*.{jpg,jpeg,png,gif}',
	htmlIn: 'src/*.html',
	scssIn: 'src/scss/**/*.scss',
	
	jsWorker: 'src/jsWorker/',
	jsWorkerFiles: 'src/jsWorker/**/*.js',
	
	cssOut: 'dist/css/',
	jsOut: 'dist/js/',
	imgOut: 'dist/img/',
	htmlOut: 'dist/',
	scssOut: 'src/css/',
	cssOutName: 'style.css',
	jsOutName: 'script.js',
	cssReplaceOut: 'css/style.css',
	jsReplaceOut: 'js/script.js'
};

gulp.task('reload', () => {
	browserSync.reload();
});

gulp.task('serve', ['sass'], () => {
	browserSync({
		server: config.src
	});

	gulp.watch([config.htmlIn, config.jsIn], ['reload']);
	gulp.watch(config.scssIn, ['sass']);
});

gulp.task('sass', () => {
	return gulp.src(config.scssIn)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scssOut))
		.pipe(browserSync.stream());
});

gulp.task('css', () => {
	return gulp.src(config.cssIn)
		.pipe(concat(config.cssOutName))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.cssOut));
});

gulp.task('babel', () => {
	return gulp.src(config.jsIn)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.jsWorker))
});

gulp.task('js', () => {
	return gulp.src(config.jsWorkerFiles)
		.pipe(concat(config.jsOutName))
		.pipe(uglify())
		.pipe(gulp.dest(config.jsOut));
});

gulp.task('img', () => {
	return gulp.src(config.imgIn)
		.pipe(changed(config.imgOut))
		.pipe(imagemin())
		.pipe(gulp.dest(config.imgOut));
});

gulp.task('html', () => {
	return gulp.src(config.htmlIn)
		.pipe(htmlReplace({
			'css': config.cssReplaceOut,
			'js': config.jsReplaceOut
		}))
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(config.dist))
});

gulp.task('clean', () => {
	return del([config.dist,config.jsWorker]);
});

gulp.task('build', () => {
	sequence('clean', 'html', 'babel', ['js', 'css', 'img']);
});

gulp.task('default', ['serve']);
