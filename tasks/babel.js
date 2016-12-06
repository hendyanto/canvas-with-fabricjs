var gulp = require('gulp');
var glob = require('glob');

var browserify = require('browserify');
var babelify = require('babelify');

var gutil = require('gutil');
var chalk = require('chalk');

var source = require('vinyl-source-stream');

gulp.task('babel', function(done){
  var options = {
    cwd: './lib/'
  };
  var entries = [];
  glob('*.js', options, function(err, files){
    var list = files.map(function(file){
      entries.push(options.cwd + file);
    });

    console.log(entries);

    browserify({
      entries: entries
    })
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .on('error', function(err){
      if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
          + ': '
            + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
      } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
          + ': '
            + chalk.yellow(err.message))
      }
    })
    .pipe(source('bin/main.js'))
    .pipe(gulp.dest('.'));
  });
  done();
});
