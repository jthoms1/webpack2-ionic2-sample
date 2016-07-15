var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var argv = process.argv;

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var isRelease = false;
if (argv.indexOf('--release') > -1) {
  isRelease = true;
  process.env.NODE_ENV = 'production';
}
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;

gulp.task('html', require('ionic-gulp-html-copy'));
gulp.task('fonts', require('ionic-gulp-fonts-copy'));
gulp.task('lint', require('ionic-gulp-tslint'));
gulp.task('clean', function(){
  return del('www/build');
});

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
//gulp.task('serve:before', ['watch']);
gulp.task('serve:before', ['build']);

gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/*
 *
 */
gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['html', 'fonts'],
    function(){
      gulpWatch('app/**/*.html', function(){ gulp.start('html'); });

      var compiler = webpack(webpackConfig);
			new WebpackDevServer(compiler, {
					// server and middleware options

			}).listen(8080, 'localhost', function(err) {
					if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
          }
					gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
			});
    }
  );
});

/*
 *
 */
gulp.task('build', ['clean'], function(done){
  runSequence(
    ['html', 'fonts'],
    function() {
			webpack(webpackConfig, function(err, stats) {
				if (err) {
					console.log('webpack', stats.toString({}));
				}
				done();
			});
    }
  );
});

