// third party imports
import throttle from 'lodash/function/throttle'
// local imports
import calculateResponsiveState from '../actions/creators/calculateResponsiveState'


/**
 * Dispatches an action to calculate the responsive state, then kicks of the
 * (throttled) window resize event listener (which will dispatch further such
 * actions).
 * @arg {object} store - The redux store.  Really you only need to pass `{dispatch}`.
 * @arg {number} [throttle_time=100] - Throttle time (in miliseconds) for the
 * window resize event handler.
 */
export default (store, throttle_time = 100) => {
    // throttled event handler for window resize
    const throttled_handler = throttle(
        // just dispatch action to calculate responsive state
        () => store.dispatch(calculateResponsiveState(
            // annoying existential check for window
            typeof window === 'undefined' ? {} : window
        )),
        throttle_time
    )
    // initialize the responsive state
    throttled_handler()
    // if there is a `window`
    if (typeof window !== 'undefined') {
        // add the resize event listener
        window.addEventListener('resize', () => throttled_handler())
    }
    // return the store so that the call is transparent
    return store
}
