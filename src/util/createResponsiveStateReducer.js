// third party imports
import MediaQuery from 'mediaquery'
import transform from 'lodash/object/transform'
import reduce from 'lodash/collection/reduce'
// local imports
import CALCULATE_RESPONSIVE_STATE from '../actions/types/CALCULATE_RESPONSIVE_STATE'


// default breakpoints
const defaultBreakpoints = {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
// media type to default to when no `window` present
const defaultMediaType = 'infinity'


/**
 * Compute the `lessThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `lessThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is less than the breakpoint.
 */
function getLessThan(browserWidth, breakpoints, currentMediaType) {
    return transform(breakpoints, (result, breakpoint, mediaType) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number') {
            // store wether or not it is less than the breakpoint
            result[mediaType] = browserWidth < breakpoint && mediaType !== currentMediaType
        // handle non numerical breakpoints specially
        } else {
            result[mediaType] = false
        }
    })
}


/**
 * Compute the `greaterThan` object based on the browser width.
 * @arg {number} browserWidth - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `greaterThan` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is greater than the breakpoint.
 */
function getGreaterThan(browserWidth, breakpoints) {
    return transform(breakpoints, (result, breakpoint, mediaType) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number') {
            // store wether or not it is greater than the breakpoint
            result[mediaType] = browserWidth > breakpoint
        } else {
            result[mediaType] = false
        }
    })
}


/**
 * Gets the current media type from the global `window`.
 * @arg {object} mediaQueries - The media queries object.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getMediaType(matchMedia, mediaQueries) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the default
        return defaultMediaType
    }

    // there is a window, so compute the true media type
    return reduce(mediaQueries, (result, query, type) => {
        // return the new type if the query matches otherwise the previous one
        return matchMedia(query).matches ? type : result
    // use the default media type
    }, defaultMediaType)
}



// export the reducer factory
export default (breakpoints = defaultBreakpoints) => {
    // add `infinity` breakpoint for upper bound
    breakpoints[defaultMediaType] = Infinity
    // media queries associated with the breakpoints
    const mediaQueries = MediaQuery.asObject(breakpoints)

    // return reducer for handling the responsive state
    return (state, action) => {
        // if told to recalculate state or state has not yet been initialized
        if (action.type === CALCULATE_RESPONSIVE_STATE || typeof state === 'undefined') {
            // the current media type
            const mediaType = getMediaType(action.matchMedia, mediaQueries)
            // return calculated state
            return {
                width: action.innerWidth,
                lessThan: getLessThan(action.innerWidth, breakpoints, mediaType),
                greaterThan: getGreaterThan(action.innerWidth, breakpoints),
                mediaType,
            }
        }
        // otherwise return the previous state
        return state
    }
}
