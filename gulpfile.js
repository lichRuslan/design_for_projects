const gulp = require ('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const braowserSync  =require('browser-sync');
const plumber = require ('gulp-plumber');
gulp.task('scss', ()=>{
    return gulp
    .src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(scss())
    .pipe(
        autoprefixer(['last 15 versions', '> 1%','ie 8', 'ie 7']),{
            cascade: true
        }
    )
    // .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(braowserSync.reload({stream:true}));
});

gulp.task('browser-sync', ()=> {
    braowserSync({
        server:{
            baseDir:'dist'
        },
        notify:false
    })
});

gulp.task('default', ['browser-sync','scss'],()=> {
    gulp.watch('dev/scss/**/*.scss', ['scss']);
    gulp.watch('dist/*.html', braowserSync.reload);
});