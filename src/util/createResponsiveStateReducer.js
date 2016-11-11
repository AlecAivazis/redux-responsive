// third party imports
import MediaQuery from 'mediaquery'
import transform from 'lodash/transform'
import reduce from 'lodash/reduce'
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
// orientation to default to when no `window` present
const defaultOrientation = null

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
 * @arg {string} infinityMediaType - The infinity media type.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getMediaType(matchMedia, mediaQueries, infinityMediaType) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the infinity media type
        return infinityMediaType
    }

    // there is a window, so compute the true media type
    return reduce(mediaQueries, (result, query, type) => {
        // return the new type if the query matches otherwise the previous one
        return matchMedia(query).matches ? type : result
    // use the infinity media type
    }, infinityMediaType)
}


/**
 * Gets the current media type from the global `window`.
 * @arg {object} mediaQueries - The media queries object.
 * @returns {string} The window's current media type.  This is the key of the
 * breakpoint that is the next breakpoint larger than the window.
 */
function getOrientation(matchMedia) {
    // if there's no window
    if (typeof matchMedia === 'undefined') {
        // return the default
        return defaultOrientation
    }

    const mediaQueries = {
        portrait: '(orientation: portrait)',
        landscape: '(orientation: landscape)',
    }

    // there is a window, so compute the true orientation
    return reduce(mediaQueries, (result, query, type) => {
        // return the new type if the query matches otherwise the previous one
        return matchMedia(query).matches ? type : result
    // use the default orientation
    }, defaultOrientation)
}


// export the reducer factory
export default (breakpoints = defaultBreakpoints, infinityMediaType = defaultMediaType) => {
    // add `infinity` breakpoint for upper bound
    breakpoints[infinityMediaType] = Infinity
    // media queries associated with the breakpoints
    const mediaQueries = MediaQuery.asObject(breakpoints)

    // return reducer for handling the responsive state
    return (state, {type, matchMedia, innerWidth, innerHeight}) => {
        // if told to recalculate state or state has not yet been initialized
        if (type === CALCULATE_RESPONSIVE_STATE || typeof state === 'undefined') {
            // the current media type
            const mediaType = getMediaType(matchMedia, mediaQueries, infinityMediaType)
            // the current orientation
            const orientation = getOrientation(matchMedia)
            // return calculated state
            return {
                _responsiveState: true,
                width: innerWidth,
                height: innerHeight,
                lessThan: getLessThan(innerWidth, breakpoints, mediaType),
                greaterThan: getGreaterThan(innerWidth, breakpoints),
                mediaType,
                orientation,
                breakpoints,
            }
        }
        // otherwise return the previous state
        return state
    }
}
