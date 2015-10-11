// third party imports
import MediaQuery from 'mediaquery'
import transform from 'lodash/object/transform'
// local imports
import CALCULATE_RESPONSIVE_STATE from '../actions/types/CALCULATE_RESPONSIVE_STATE'


// default breakpoints
const default_breakpoints = {
    extra_small: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
// media type to default to when no `window` present
const default_media_type = 'infinity'


/**
 * Compute the `less_than` object based on the browser width.
 * @arg {number} browser_width - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `less_than` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is less than the breakpoint.
 */
function getLessThan(browser_width, breakpoints) {
    return transform(breakpoints, (result, breakpoint, media_type) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number') {
            // store wether or not it is less than the breakpoint
            result[media_type] = browser_width < breakpoint
        } else {
            result[media_type] = false
        }
    })
}


/**
 * Compute the `greater_than` object based on the browser width.
 * @arg {number} browser_width - Width of the browser.
 * @arg {object} breakpoints - The breakpoints object.
 * @returns {object} The `greater_than` object.  Its keys are the same as the
 * keys of the breakpoints object.  The value for each key indicates whether
 * or not the browser width is greater than the breakpoint.
 */
function getGreaterThan(browser_width, breakpoints) {
    return transform(breakpoints, (result, breakpoint, media_type) => {
        // if the breakpoint is a number
        if (typeof breakpoint === 'number') {
            // store wether or not it is greater than the breakpoint
            result[media_type] = browser_width > breakpoint
        } else {
            result[media_type] = false
        }
    })
}


/**
 * Gets the current media type from the global `window`.
 * @arg {object} media_queries - The media queries object.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getMediaType(matchMedia, media_queries) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the default
        return default_media_type
    }

    // there is a window, so compute the true media type
    return transform(media_queries, (result, query, type) => {
        // if the browser matches the media query
        if (matchMedia(query).matches) {
            // use the current media type
            /* eslint-disable no-param-reassign */
            result = type
            /* eslint-enable no-param-reassign */
        }
    })
}



// export the reducer factory
export default (breakpoints = default_breakpoints) => {
    // add `infinity` breakpoint for upper bound
    breakpoints[default_media_type] = Infinity
    // media queries associated with the breakpoints
    const media_queries = MediaQuery.asObject(breakpoints)

    // return reducer for handling the responsive state
    return (state, action) => {
        // if told to recalculate state or state has not yet been initialized
        if (action.type === CALCULATE_RESPONSIVE_STATE || typeof state === 'undefined') {
            // return calculated state
            return {
                width: action.innerWidth,
                less_than: getLessThan(action.innerWidth, breakpoints),
                greater_than: getGreaterThan(action.innerWidth, breakpoints),
                media_type: getMediaType(action.matchMedia, media_queries),
            }
        }
        // otherwise return the previous state
        return state
    }
}
