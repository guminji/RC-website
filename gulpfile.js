/**
 * Created by guminji on 2017/8/31.
 */
var gulp = require('gulp'),
    less = require('gulp-less');
gulp.task('watch',function(){
    gulp.watch('./less/*.less', ['less']);
})
gulp.task('less',function(){
    gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./files/css'));
})