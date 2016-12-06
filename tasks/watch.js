var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function(){
  return watch('lib/*.js', function(){
    gulp.start('babel');
  });
});
