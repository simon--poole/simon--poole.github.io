/* Basic Gulp */
var gulp = require("gulp");
/* Sass to convert */
var sass = require("gulp-sass");
/* Sourcemaps for dev */
var sourcemaps = require("gulp-sourcemaps");
/* Postcss....multiple funcs */
var postcss = require("gulp-postcss");
/* Remove legacy prefixes */
var unprefix = require("postcss-unprefix");
/* Adds currently needed prefixes */
var autoprefixer = require("autoprefixer");
/* Minimises CSS */
var cssnano = require("cssnano");

gulp.task("watch", ["sass-compile"], function () {
	gulp.watch("src/style.scss", ["sass-compile"]);
});

gulp.task("default", ["sass-compile"]);

var sassOpts = {
	outputStyle: "extended"
}

var processors = [
	unprefix,
	autoprefixer({ browsers: ["last 3 versions"], remove: false }),
	cssnano
]

gulp.task("sass-compile", function () {
	return gulp.src(["src/style.scss"])
		.pipe(sourcemaps.init())
		.pipe(sass(sassOpts))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write("/"))
		.pipe(gulp.dest("assets/"));
});
