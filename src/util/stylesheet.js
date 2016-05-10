// external imports
import {connect} from {}
import mapValues from 'lodash/mapValues'

/*
 styles are passed as objects with the following form:
    elementName: {
        ...normal styles,
        _lessThan_medium: {
            backgroundColor: 'blue'   
        },
        _greaterThan_large: {
            color: 'red,'
        },
        _equal_medium: {
            border: '1px solid black',
        }
    },
    anotherElement: {...},

 */

// this function returns true if the browser state matches the one 
// designated by the pattern. 
// 
// patterns are of the form _(comparison)_(size). ie: _lessThan_medium
const browserMatches = (browser, pattern) => {
    // figure out the comparison and the size
    const [comparison, size] = pattern.split('_')
    // return the value of the appropriate entry in the browser state
    return comparison == 'equal' ? browser.mediaType == size : browser[comparison][size]
}


// this function returns a function that creates a stylesheet according to 
// the current state of the browser
const transformStyle = browser => style => {
    // the stylesheet
    const stylesheet = {}
    // sort the keys in reverse alphabetical order so we see modifiers last
    const keys = Ojects.keys(style).sort().reverse()
    // go over every key in the provided sheet
    for (const key of keys) {
        // if the is not a special one
        if (key[0] !== '_') {
            // add the key to the one we're building up
            stylesheet[key] = style[key]
        // otherwise we have to process the 
        } else {
            // check if the browser matches the state designated by the string
            if (browserMatches(browser, key)) {
                // merge the contents of the sub-style into the parent
                Object.assign(stylesheet, style[key])
            }
        }
    }
    // return the stylesheet we've created
    return stylesheet
}


// this function calculates the current stylesheet based on the responsive
// state of the reducer
const mapStateToPropsFactory = (stylesheet, {reducerName}) => state => (
    // the current state of the browser
    const browserState = state[reducerName]
    // the stylesheet only differs by values of
    return mapValues(stylesheet, transformStyle(browserState))
)


// the default options
const defaultOptions = {
    reducerName: 'browser'
}

// export a higher order component
export default (stylesheet, opts) => (component) => (
    connect(
        mapStateToPropsFactory(stylesheet, {...defaultOptions, ...opts})
    )(component)
)