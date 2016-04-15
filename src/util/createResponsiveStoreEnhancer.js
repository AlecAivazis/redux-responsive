// local imports
import addEventHandlers from './addEventHandlers'

/**
 * Creates a store enhancer based off an (optional) throttle time.
 * @arg {object} [options={throttleTime,calculateStateInitially}] - Options object.
 * @arg {number} [options.throttleTime=100] - Throttle time (in miliseconds) for
 * the window resize event handler.
 * @arg {boolean} [options.calculateStateInitially=true] - True if the responsive
 * state must be calculated initially, false otherwise.
 * @returns {function} - The store enhancer (which adds event listeners to
 * dispatch actions on window resize).
 */
export default ({throttleTime = 100, calculateStateInitially = true} = {}) => {
    // return store enhancer
    return (createStore) =>
        // return enhanced version of `createStore`
        (...args) =>
            // return store after adding event handlers
            addEventHandlers(createStore(...args), {throttleTime, calculateStateInitially})
}
