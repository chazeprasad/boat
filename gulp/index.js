import '@babel/polyfill';
import del from 'del';
import gulp from 'gulp';
import changed from 'gulp-changed';
import nodemon from 'gulp-nodemon';
import ts from 'gulp-typescript';
import debug from 'debug';
import {argv} from 'yargs';
import runSequence from 'gulp4-run-sequence';

import config from './config';

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv && argv.prod) {
  process.env.NODE_ENV = 'production';
}
global.PROD = process.env.NODE_ENV === 'production';

var log = debug(`TS-Watch:log`);
debug.enable(`TS-Watch:log`);

function onChange(e) {
    log('File ' + e.path + ' has been changed. Updating..');
}

var watch = gulp.task('watch', async () => {
    global.isWatching = true;

    // gulp.watch(config.assets.src, ['assets']).on('change', onChange);
    gulp.watch(config.ts.src, gulp.series('transpile'));
})

// pull in the project TypeScript config
var transpile = gulp.task('transpile', async () => {
    const tsProject = ts.createProject(config.tsConfig);

    const tsResult = tsProject.src()
        .pipe(tsProject());

    await tsResult.js.pipe(gulp.dest(config.buildDir))
    
    
})

var html = gulp.task('html', async () => {
    await gulp.src(config.html.src)
        .pipe(changed(config.html.dest)) // Ignore unchanged files
        // Optimize
        .pipe(gulp.dest(config.html.dest))
})


var serve = gulp.task('serve', async (next) => {
    await nodemon({
        // script: './index.js',
        ext: 'ts js json env',
        env: { 'NODE_ENV': 'development' },
        delay: 5000,
        ignore: [
            "./test/*",
            "./docs/*",
            "./gulp/*",
            "./.git",
            "./node_modules/*"
        ],

        watch: ["./src"],
        exec: "ts-node ./src/server.ts",
        done: next
    })
})


var build = gulp.task('build', (next) => {
    global.isProd = true;
    runSequence('transpile', 'assets', next);
})

var dev = gulp.task('dev',  async (next) => {
    global.isProd = false;
    // runSequence('clean', 'transpile', 'assets', 'html', 'watch', 'serve', next)
    runSequence('serve', next)
    
    
})

var clean = gulp.task('clean', async () => {
    await del([config.buildDir] );
})

var assets = gulp.task('assets', async (next) => {
    await gulp.src(config.assets.src)
        .pipe(changed(config.assets.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.assets.dest))
        .on('end', next)
})
