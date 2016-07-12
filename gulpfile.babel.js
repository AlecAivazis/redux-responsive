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
 * Build entry points.
 */
gulp.task('build', ['build:core', 'build:react'])
gulp.task('build:prod', ['production', 'build'])


/**
 * Sets the current chain of tasks to 'production mode'.
 */

gulp.task('production', () => {
    // set the environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
})


/**
 * Build the core library.
 */
gulp.task('build:core', () => buildFile(projectPaths.entry, 'index'))


/**
 * Build the react run modules.
 */
gulp.task('build:react', () => buildFile(projectPaths.reactEntry, 'react'))


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



// Utilities

const buildFile = (source, name) => (
  gulp.src(source)
      .pipe(named(() => name))
      .pipe(webpack(require(projectPaths.webpackConfig)))
      .pipe(gulp.dest(projectPaths.buildDir))
)


// end of file
