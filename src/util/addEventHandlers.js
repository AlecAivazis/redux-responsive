// local imports
import addThrottledHandlers from './addThrottledHandlers'
import addPerformanceModeHandlers from './addPerformanceModeHandlers'

/**
 * Dispatches an action to calculate the responsive state, then kicks of the
 * (throttled) window resize event listener (which will dispatch further such
 * actions).
 * @arg {object} store - The redux store.  Really you only need to pass `{dispatch}`.
 * @arg {object} options - Options.
 * @arg {number} options.throttleTime - Throttle time (in miliseconds) for the
 * window resize event handler.
 * @arg {boolean} options.calculateInitialState - True if the responsive state
 * must be calculated initially, false otherwise.
 */
export default (store, {throttleTime, calculateInitialState, performanceMode}) => {
    // if there is a `window`
    if (typeof window !== 'undefined') {
        // if we need to enable performance mode
        if (performanceMode) {
            // add the handlers that only fire when the responsive state changes
            addPerformanceModeHandlers({store, window, calculateInitialState})
        // otherwise we should just add the throttled handlers
        } else {
            // add the throttled (continuously evaluated) handlers
            addThrottledHandlers({store, window, throttleTime, calculateInitialState})
        }
    }

    // return the store so that the call is transparent
    return store
}
