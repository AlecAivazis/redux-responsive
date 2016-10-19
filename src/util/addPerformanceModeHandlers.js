// see: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

// external imports
import MediaQuery from 'mediaquery'
// local imports
import calculateResponsiveState from '../actions/creators/calculateResponsiveState'

// this function adds event handlers to the window that only tirgger
// when the responsive state changes
export default ({store, window, calculateStateInitially}) => {
    // the function to call when calculating the new responsive state
    function refreshResponsiveState() {
        store.dispatch(calculateResponsiveState(window))
    }

    // grab the current state of the store
    const storeState = store.getState()

    // go through every reducer at the root of the project
    const responsiveReducer = Object.keys(storeState).reduce((prev, current) => (
        // if the reducer contains the responsive state marker then keep it
        storeState[current] && storeState[current]._responsiveState ? current : prev
    // otherwise the value should be at least falsey
    ), false)

    // if we couldn't find a responsive reducer at the root of the project
    if (!responsiveReducer) {
        throw new Error(
            'Could not find responsive state reducer - Performance mode can only '
            + 'be used if the responsive reducer is at the root of your reducer tree.'
        )
    }

    // get the object of breakpoints
    const breakpoints = storeState[responsiveReducer].breakpoints
    // get the object of media queries
    const mediaQueries = MediaQuery.asObject(breakpoints)

    // for every breakpoint range
    Object.keys(mediaQueries).forEach(breakpoint => {
        // create a media query list for the breakpoint
        const mediaQueryList = window.matchMedia(mediaQueries[breakpoint])

        /* eslint-disable no-loop-func */

        // whenever any of the media query lists status changes
        mediaQueryList.addListener((query) => {
            // if a new query was matched
            if (query.matches) {
                // recaulate the state
                refreshResponsiveState()
            }
        })

    })

    // if we are supposed to calculate the initial state
    if (calculateStateInitially) {
        // then do so
        refreshResponsiveState()
    }
}
