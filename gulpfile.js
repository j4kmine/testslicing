var gulp = require('gulp'),
sass = require('gulp-sass'),
scss = require('gulp-scss'),
uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
concat = require('gulp-concat'),
header = require('gulp-header'),
sourcemaps = require('gulp-sourcemaps'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
merge = require('merge-stream'),
data = require('gulp-data'),
nunjucks = require('gulp-nunjucks-render'),
prefixer = require('gulp-autoprefixer'),
webpack = require('webpack'),
webpackStream = require('webpack-stream'),
cssbeautify = require('gulp-cssbeautify'),
rename = require('gulp-rename');
// Server
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('package.json'));

// Task options
var opts = {
	assetsPath: './src',
	minRename: {
		suffix: '.min',
	},
	banner: [
		'/*!',
		'Style Name: adamar',
		'Description: Web Adamar',
		'Version: 1.0',
		'Author: getcraft',
		'Author URI: #',
		'*/\n',
	].join('\n'),
	css_files: [],
	js_files: [
		'./src/js/popper.min.js',
		'./node_modules/bootstrap/js/dist/util.js',
		'./node_modules/bootstrap/js/dist/alert.js',
		'./node_modules/bootstrap/js/dist/scrollspy.js',
		'./node_modules/bootstrap/js/dist/dropdown.js',
		'./node_modules/bootstrap/js/dist/modal.js',
		'./node_modules/bootstrap/js/dist/collapse.js',
		'./node_modules/bootstrap/js/dist/button.js'	]
};

const serverConfig = {
	server: {
		baseDir: "./"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "gulp_project"
};
// Nunjucks Task
// Combine HTML

gulp.task('nunjucks', function () {
    return gulp.src([
    	'./src/templates//**/*.html',
    	'!./src/templates/menu.html',
    	'!./src/templates/layout.html',
    	'!./src/templates/footer.html'
    	])
        .pipe(data(function() {
			return require('./src/data.json')
		}))
		.pipe(nunjucks({
			path: ['./src/templates/']
		}))
        .pipe(gulp.dest('./'))
		.pipe(reload({
			stream: true
		}));
});
// Styles Task
gulp.task('styles', function() {

	var mainCss = gulp.src(['./src/sass/style.scss'])
		.pipe(plumber({errorHandler: function(err){
			notify.onError({
				title: "Gulp Error in" + err.plugin,
				message: err.toString()
			})(err)
		}}))
		.pipe(prefixer())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))

	var depsCss = gulp.src( opts.css_files )
		.pipe(cleanCSS())
		.pipe(plumber());
	return merge(depsCss, mainCss)
		.pipe(concat('style.css'))
		.pipe(header(opts.banner, pkg))
		.pipe(sourcemaps.write('style-maps'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('stylesBeauty', function() {
	return gulp.src(['./src/sass/style.scss'])
		.pipe(plumber({errorHandler: function(err){
			notify.onError({
				title: "Gulp Error in" + err.plugin,
				message: err.toString()
			})(err)
		}}))
		.pipe(prefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(rename('style-beauty.css'))
		.pipe(cssbeautify())
		.pipe(plumber())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({
			stream: true
		}));
});
// Scripts Task
// Uglifies
gulp.task('scripts', function() {

	gulp.src( opts.js_files )
	.pipe(uglify())
	.pipe(plumber())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('./dist/js/'))
	.pipe(reload({
		stream: true
	}));
});

// Task Task
// Watches JS
gulp.task('watch', function() {
	gulp.watch('src/templates/*.html', ['nunjucks']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch(['src/sass/**/**.scss'], ['styles']);
	gulp.watch(['src/sass/**/**.scss'], ['stylesBeauty']);
});
gulp.task('webserver', function() {
	browserSync(serverConfig);
});
// Default Task
// Gulp

gulp.task('default', ['nunjucks', 'styles', 'stylesBeauty', 'scripts', 'watch', 'webserver']);



