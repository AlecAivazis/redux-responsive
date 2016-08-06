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
        storeState[current]._responsiveState ? current : prev
    // otherwise the value should be at least falsey
    ), false)

    // if we couldn't find a responsive reducer at the root of the project
    // if (!responsiveReducer) {
    //     throw {
    //         name: 'Responsive State Error',
    //         message: 'Could not find responsive state reducer - Performance mode can only '
    //                  + 'be used if the responsive reducer is at the root of your reducer tree.'
    //     }
    // }

    // get the object of breakpoints
    const breakpoints = storeState[responsiveReducer].breakpoints

    // get the object of media queries
    const mediaQueries = MediaQuery.asObject(breakpoints)

    // for every breakpoint range
    for (const breakpoint of Object.keys(mediaQueries)) {

        // if we are looking at a non-valued breakpoint (like infinity)
        if (!breakpoints[breakpoint]) {
            continue
        }

        // create a media query list
        const mediaQueryList = window.matchMedia(mediaQueries[breakpoint])

        /* eslint-disable no-loop-func */

        // whenever any of the media query lists status changes
        mediaQueryList.addListener((query) => {
            // if its a match
            if (query.matches) {
                console.log('updated media query match')
                // recaulate the state
                refreshResponsiveState()
            }
        })

        /* eslint-enable no-loop-func */
    }

    // if we are supposed to calculate the initial state
    if (calculateStateInitially) {
        // then do so
        refreshResponsiveState()
    }
}
