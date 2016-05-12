// local imports
import {
    parsePattern,
    browserMatches,
    sortKeys,
    transformStyle,
} from 'util/stylesheet'

describe('ReactStyleSheet', function () {
    it("can parse the relevant data from style patterns", function() {
        // the pattern to test
        const pattern = '_lessThan_medium'
        // grab the relevant data
        const {comparison, size} = parsePattern(pattern)
        // make sure the values match up
        expect(comparison).to.equal('lessThan')
        expect(size).to.equal('medium')
    })

    it("can match a browser state with a pattern", function() {
        // the mocked state of the browser reducer
        const browser = {
            greaterThan: {
                medium: true,
                large: false
            },
            mediaType: 'large',
        }
        // the pattern to test
        const truePattern = '_greaterThan_medium'
        const falsePattern = '_greaterThan_large'
        const equalPattern = '_equal_large'
        // make sure the browse matches
        expect(browserMatches(browser, truePattern)).to.be.true
        expect(browserMatches(browser, falsePattern)).to.be.false
        expect(browserMatches(browser, equalPattern)).to.be.true
    })

    it("can sort style keys in the correct order", function() {
        // the breakpoints to define ordering
        const breakpoints = ['medium', 'large']
        // the keys (unsorted)
        const keys = [
            '_lessThan_medium',
            'background',
            '_greaterThan_large',
            'color',
            '_lessThan_large',
            '_equal_medium',
            '_greaterThan_medium',
            'border',
        ]
        // make sure the responsive styles came last and are ordered correctly
        // note: there are 3 none responsive styles in the test
        // the correct order for responsive styles
        // lessThan (descending), greaterThan (ascending), equals
        expect(sortKeys(keys, breakpoints).slice(3)).to.deep.equal([
            '_lessThan_large',
            '_lessThan_medium',
            '_greaterThan_medium',
            '_greaterThan_large',
            '_equal_medium',
        ])
    })

    it("can merge responsive styles into base style", function() {
        // the mocked browser state
        const browser = {
            greaterThan: {
                medium: true,
                large: false,
            },
            lessThan: {
                medium: false,
                large: true,
            },
            mediaType: 'large',
            breakpoints: ['medium', 'large']
        }
        // the stylesheet
        const baseValue = 'black'
        const greaterThanValue = 'blue'
        const lessThanValue = 'green'

        const stylesheet = {
            'border': baseValue,
            '_greaterThan_medium': {
                'border': greaterThanValue,
            },
            '_lessThan_large': {
                'border': lessThanValue,
            }
        }
        // the tranformer takes the browser state and returns a function that
        // takes the responsive stylesheet and returns the final one
        const computedStyle = transformStyle(browser)(stylesheet)
        // make sure the stylesheet is what we expect
        expect(computedStyle['border']).to.equal(lessThanValue)
    })
})