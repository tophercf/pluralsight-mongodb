var gulp = require('gulp'),
    nodemon = require('nodemon'),
    exec = require('child_process').exec,
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

function runCommand(command) {
    return function(cb) {
        exec(command, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
}

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    }).
    on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('start-mongo', runCommand('mongod --dbpath ./data/'));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));

gulp.task('test', function(){
    env({vars: {ENV:'Test'}});
    gulp.src('tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))
});