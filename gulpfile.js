var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('bundle', function(){
    return browserify('./src/app.js')
    .transform('babelify', {presets: ['react', 'es2015']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/'));
});

gulp.task('watch', function () {
    var b = browserify({
        entries: ['src/app.js'],
        cache: {}, packageCache: {},
        plugin: ['watchify']
    });

    b.on('update', makeBundle);

    function makeBundle() {
        b.transform('babelify', { presets: ['react', 'es2015'] })
            .bundle()
            .on('error', function(err){
                console.log(err.message);
                console.error(err.codeFrame);
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('static/'));
        console.log("Bundle updated, success");
    }

    // we have to call bundle once to kick it off.
    makeBundle();

    return b;
});