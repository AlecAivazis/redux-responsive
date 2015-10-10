// gulp imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'
import karma from 'karma'
// local imports
import project_paths from './config/project_paths'


/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src(project_paths.entry)
               .pipe(named())
               .pipe(webpack(require(project_paths.webpack_config)))
               .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...require(project_paths.webpack_config),
        watch: true,
    }

    return gulp.src(project_paths.entry)
               .pipe(named())
               .pipe(webpack(config))
               .pipe(gulp.dest(project_paths.build_dir))
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
    return gulp.src(project_paths.entry)
               .pipe(named())
               .pipe(webpack(require(project_paths.webpack_config)))
               .pipe(gulp.dest(project_paths.build_dir))
})


/**
 * Remove all ouptut files from previous builds.
 */
gulp.task('clean', () => {
    del.sync(project_paths.build_dir)
})


/**
 * Run the test suite once.
 */
gulp.task('test', (cb) => {
    const server = new karma.Server({
        configFile: project_paths.karma_config,
        singleRun: true
    }, () => cb())

    server.start()
})


/**
 * Watch source and tests for changes, run tests on change.
 */
gulp.task('tdd', () => {
    const server = new karma.Server({
        configFile: project_paths.karma_config,
    })

    server.start()
})


// end of file
