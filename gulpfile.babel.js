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
gulp.task('build', ['clean', 'build:core', 'build:react'])


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

gulp.task('production', () => {
    // set the environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
})


gulp.task('build:core', () => {
    // build the client
    return buildFile(projectPaths.entry, 'index')
})


gulp.task('build:react', () => {
    return buildFile(projectPaths.reactEntry, 'react')
})

// Production aliases

gulp.task('build:prod', ['production', 'build:core', 'build:react'], () => {
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


// Utilities

const buildFile = (source, name) => (
  gulp.src(source)
      .pipe(named(() => name))
      .pipe(webpack(require(projectPaths.webpackConfig)))
      .pipe(gulp.dest(projectPaths.buildDir))
)

// end of file
