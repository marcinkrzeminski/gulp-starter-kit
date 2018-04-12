const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
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
	cssin: 'src/css/**/*.css',
	jsin: 'src/js/**/*.js',
	es6in: 'src/es6/**/*.js',
	jsin: 'src/js/**/*.js',
	imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
	htmlin: 'src/*.html',
	scssin: 'src/scss/**/*.scss',
	cssout: 'dist/css/',
	jsout: 'dist/js/',
	es6out: 'dist/es6/',
	imgout: 'dist/img/',
	htmlout: 'dist/',
	scssout: 'src/css/',
	cssoutname: 'style.css',
	jsoutname: 'script.js',
	cssreplaceout: 'css/style.css',
	jsreplaceout: 'js/script.js'
};

gulp.task('reload', () => {
	browserSync.reload();
});

gulp.task('serve', ['sass'], () => {
	browserSync({
		server: config.src
	});

	gulp.watch([config.htmlin, config.jsin], ['reload']);
	gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', () => {
	return gulp.src(config.scssin)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scssout))
		.pipe(browserSync.stream());
});

gulp.task('css', () => {
	return gulp.src(config.cssin)
		.pipe(concat(config.cssoutname))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.cssout));
});

gulp.task('babel', () => {
	gulp.src(config.es6in)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest(config.es6out))
});

gulp.task('js', () => {
	return gulp.src(config.jsin)
		.pipe(concat(config.jsoutname))
		.pipe(uglify())
		.pipe(gulp.dest(config.jsout));
});

gulp.task('img', () => {
	return gulp.src(config.imgin)
		.pipe(changed(config.imgout))
		.pipe(imagemin())
		.pipe(gulp.dest(config.imgout));
});

gulp.task('html', () => {
	return gulp.src(config.htmlin)
		.pipe(htmlReplace({
			'css': config.cssreplaceout,
			'js': config.jsreplaceout
		}))
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(config.dist))
});

gulp.task('clean', () => {
	return del([config.dist]);
});

gulp.task('build', () => {
	sequence('clean', ['html', 'babel', 'js', 'css', 'img']);
});

gulp.task('default', ['serve']);
