const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["copy-html", "copy-image", "webpack"]);

gulp.task("copy-html", [], function() {
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist/'));
});

gulp.task("copy-image", [], function() {
	gulp.src('src/**/*.{gif,png}')
	.pipe(gulp.dest('dist/'));
});

gulp.task("webpack", function(){
	gulp.src('src/js/application.js')
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('dist/'));
})

gulp.task("watch", [], function(){
	gulp.watch('src/**/*', ['copy-html','webpack'])
})
