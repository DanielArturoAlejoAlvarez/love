////////////////////////////////
// Required
////////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	rename = require('gulp-rename');

////////////////////////////////
// Scripts Task
////////////////////////////////

gulp.task('scripts', function() {
	//console.log('It worked Dude!');
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
		.pipe(plumber())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
		.pipe(reload({stream:true}));
});

////////////////////////////////
// Compass/Sass Task
////////////////////////////////

gulp.task('compass', function() {
	gulp.src('app/scss/style.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'app/css',
			sass: 'app/scss',
			require: ['susy']
		}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('app/css/'))
		.pipe(reload({stream:true}));

});

////////////////////////////////
// Html Task
////////////////////////////////

gulp.task('html', function() {
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));

});

////////////////////////////////
// Build Task
////////////////////////////////

//CLEAR OUT ALL FILES AND FOLDERS FROM BUILD

gulp.task('build:cleanfolder', function(cb) {
	del([
		'build/**'
	], cb);
});

//CREATE BUILD DIRECTORY FOR ALL FILES

gulp.task('build:copy', function() {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

//REMOVE UNWANTED BUILD FILES
//LIST ALL FILES AND DIRECTORIES HERE THAT YOU DON'T WANT TO INCLUDE

gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
		'build/scss/',
		'build/js/!(*.min.js)'
	], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

////////////////////////////////
// Browser-Sync Task
////////////////////////////////

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: './app/'
		}
	});
});


////////////////////////////////
// BUILD SERVE Task
////////////////////////////////

gulp.task('build:serve', function() {
	browserSync({
		server: {
			baseDir: './build/'
		}
	});
});

////////////////////////////////
// Watch Task
////////////////////////////////

gulp.task('watch', function() {
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['compass']);
	gulp.watch('app/**/*.html', ['html']);
});


////////////////////////////////
// Default Task
////////////////////////////////

gulp.task('default', ['scripts', 'compass', 'html', 'browserSync', 'watch']);

////////////////////////////////
// Default Task
////////////////////////////////
