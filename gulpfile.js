/* global require */
"use strict";

var gulp         = require("gulp"),
	connect      = require("gulp-connect"),
	/*// jade         = require("gulp-jade"),*/
	sass         = require("gulp-sass"),
	cleanCSS 	= require('gulp-clean-css'),
	sourcemaps 	= require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cssbeautify   = require('gulp-cssbeautify');

// gulp.task("jade", function() {
// 	gulp.src("./views/page/*.jade")
// 		.pipe(jade().on('error', function(err){
// 			console.log(err);
// 		}))
// 		.pipe(jade({
// 			locals: {}
// 		}))
// 		.pipe(gulp.dest("./"))
// 		.pipe(connect.reload());
// });
gulp.task('css', function() {
	return gulp.src('./css/*.css')
		.pipe(cssbeautify({
			indent: '  ',
			openbrace: 'separate-line',
			autosemicolon: true
		}))
		.pipe(gulp.dest('./css'));
});
gulp.task("sass", function () {
	gulp.src("./src/styles/*.scss")
		.pipe(sass().on("error", sass.logError)) //чтобы не красилась ошибка - будет текст on error
		.pipe(autoprefixer({
			browsers: ['last 20 versions']
		}))
		//.pipe(cleanCSS({compatibility: 'ie10'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./css"))
		.pipe(connect.reload());
});

gulp.task("connect", function() {
	connect.server({
		root: "./",
		port: 8001,
		livereload: true
	});
});

gulp.task("html", function () {
	gulp.src("./*.html").pipe(connect.reload());
});

gulp.task("js", function () {
	gulp.src("./js/*.js").pipe(connect.reload());
});

gulp.task("css", function () {
	gulp.src("./css/*.css").pipe(connect.reload());
});

gulp.task("watch", function () {
	gulp.watch(["./*.html"], ["html"]);
	// gulp.watch(["./views/page/*.jade"], ["jade"]);

	// gulp.watch(["./src/*.css"], ["css"]);
	gulp.watch(["./src/styles/*.scss"], ["sass"]);

	gulp.watch(["./js/*.js"], ["js"]);
});

gulp.task("default", ["connect", "watch"]);

