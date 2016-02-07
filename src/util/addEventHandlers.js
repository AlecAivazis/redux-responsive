// third party imports
import throttle from 'lodash/throttle'
// local imports
import calculateResponsiveState from '../actions/creators/calculateResponsiveState'


/**
 * Dispatches an action to calculate the responsive state, then kicks of the
 * (throttled) window resize event listener (which will dispatch further such
 * actions).
 * @arg {object} store - The redux store.  Really you only need to pass `{dispatch}`.
 * @arg {number} throttleTime - Throttle time (in miliseconds) for the
 * window resize event handler.
 */
export default (store, throttleTime) => {
    // throttled event handler for window resize
    const throttledHandler = throttle(
        // just dispatch action to calculate responsive state
        () => store.dispatch(calculateResponsiveState(
            // annoying existential check for window
            typeof window === 'undefined' ? {} : window
        )),
        throttleTime
    )
    // initialize the responsive state
    throttledHandler()
    // if there is a `window`
    if (typeof window !== 'undefined') {
        // add the resize event listener
        window.addEventListener('resize', () => throttledHandler())
    }
    // return the store so that the call is transparent
    return store
}
