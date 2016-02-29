//加载插件
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    miniCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    baseurl = 'src/';

// 语法检查
gulp.task('jshint', function () {
 return gulp.src(baseurl + 'js/module/*.js')
     .pipe(jshint());
});

// 合并文件之后压缩代码
gulp.task('minify', function (){
 return gulp.src(baseurl + 'js/module/util.js')         //源文件
     .pipe(uglify())
     .pipe(rename('util.min.js'))
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'))
     .pipe(concat(baseurl + 'jquery.util'))                 //拼接
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'))
     .pipe(rename('all.js'))                            //重命名
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'))                           //目标文件夹
     .pipe(uglify())                                    //压缩
     .pipe(rename('all.min.js'))                        //重命名
     .pipe(gulp.dest(baseurl + 'js/dist/gulp/'));                          //目标文件夹
});

//sass编译
gulp.task('makeSass', function () {
    return sass(baseurl + 'css/sass/**/*.scss', {
            sourcemap: true,
            style: 'compressed'
        })
        .on('error',sass.logError)
        //.pipe(rename('zodiac.min.css'))
        //.pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps',{
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(baseurl + 'css/scss/'))
});

gulp.task('watchSass', function () {
    gulp.watch(baseurl + 'css/sass/**/*.scss', ['makeSass']); //当所有sass文件发生改变时，调用makeSass任务
});

// 监视文件的变化
gulp.task('watch', function () {
 gulp.watch(baseurl + '*.js', ['jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['jshint', 'minify', 'watch','watchSass']);