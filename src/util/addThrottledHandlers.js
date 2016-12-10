// third party imports
import throttle from 'lodash/throttle'
// local imports
import calculateResponsiveState from '../actions/creators/calculateResponsiveState'

// this function adds throttled responsive handlers to the window
export default ({store, window, throttleTime, calculateInitialState}) => {
    // throttled event handler for window resize
    const throttledHandler = throttle(
        // just dispatch action to calculate responsive state
        () => store.dispatch(calculateResponsiveState(window)),
        throttleTime
    )
    // initialize the responsive state
    if (calculateInitialState) {
        throttledHandler()
    }
    // add the resize event listener
    window.addEventListener('resize', throttledHandler)
}
