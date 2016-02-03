// local imports
import addResponsiveHandlers from './addResponsiveHandlers'

/**
 * Creates a store enhancer based off an (optional) throttle time.
 * @arg {number} [throttleTime=100] - Throttle time (in miliseconds) for the
 * window resize event handler.
 * @returns {function} - The store enhancer (which adds event listeners to
 * dispatch actions on window resize).
 */
export default (throttleTime = 100) =>
    // return store enhancer
    (createStore) =>
        // return enhanced version of `createStore`
        (...args) =>
            // return store after adding event handlers
            addResponsiveHandlers(createStore(...args), throttleTime)
