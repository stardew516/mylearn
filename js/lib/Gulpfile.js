
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var baseurl = '../../';
// 语法检查
gulp.task('jshint', function () {
 //return gulp.src('js/module/*.js')
 return gulp.src(baseurl + 'js/module/util.js')
     .pipe(jshint());
});

// 合并文件之后压缩代码
gulp.task('minify', function (){
 return gulp.src(baseurl + 'js/module/util.js')         //源文件
    .pipe(concat(baseurl + 'js/module/myplugin.js'))    //拼接
     .pipe(rename('all.js'))                            //重命名
     .pipe(gulp.dest('dist'))                           //目标文件夹
     .pipe(uglify())                                    //压缩
     .pipe(rename('all.min.js'))                        //重命名
     .pipe(gulp.dest('dist'));                          //目标文件夹
});

// 监视文件的变化
gulp.task('watch', function () {
 gulp.watch(baseurl + '*.js', ['jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['jshint', 'minify', 'watch']);