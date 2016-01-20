
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var baseurl = 'src/';
// 语法检查
gulp.task('jshint', function () {
 return gulp.src(baseurl + 'js/module/*.js')
     .pipe(jshint());
});

// 合并文件之后压缩代码
gulp.task('minify', function (){
 return gulp.src(baseurl + 'js/module/*.js')         //源文件
    .pipe(concat(baseurl + 'utils'))                 //拼接
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'))
     .pipe(rename('all.js'))                            //重命名
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'))                           //目标文件夹
     .pipe(uglify())                                    //压缩
     .pipe(rename('all.min.js'))                        //重命名
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'));                          //目标文件夹
});

// 监视文件的变化
gulp.task('watch', function () {
 gulp.watch(baseurl + '*.js', ['jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['jshint', 'minify', 'watch']);