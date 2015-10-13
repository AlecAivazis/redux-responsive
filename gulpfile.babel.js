// gulp imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'
import karma from 'karma'
// local imports
import projectPaths from './config/projectPaths'


/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src(projectPaths.entry)
               .pipe(named())
               .pipe(webpack(require(projectPaths.webpackConfig)))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...require(projectPaths.webpackConfig),
        watch: true,
    }

    return gulp.src(projectPaths.entry)
               .pipe(named())
               .pipe(webpack(config))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Build entry point for production.
 */
gulp.task('build-production', ['clean'], () => {
    // set the environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
    // build the client
    return gulp.src(projectPaths.entry)
               .pipe(named())
               .pipe(webpack(require(projectPaths.webpackConfig)))
               .pipe(gulp.dest(projectPaths.buildDir))
})


/**
 * Remove all ouptut files from previous builds.
 */
gulp.task('clean', () => {
    del.sync(projectPaths.buildDir)
})


/**
 * Run the test suite once.
 */
gulp.task('test', (cb) => {
    const server = new karma.Server({
        configFile: projectPaths.karmaConfig,
        singleRun: true
    }, () => cb())

    server.start()
})


/**
 * Watch source and tests for changes, run tests on change.
 */
gulp.task('tdd', () => {
    const server = new karma.Server({
        configFile: projectPaths.karmaConfig,
    })

    server.start()
})


// end of file
