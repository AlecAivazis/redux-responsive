// third party imports
import isFunction from 'lodash/isFunction'
import { createStore } from 'redux'
// local imports
import createResponsiveStateReducer, {
    computeOrder,
    getLessThan,
    getGreaterThan,
    getIs,
    getOrderMap,
} from 'util/createResponsiveStateReducer'


const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789'
function randomString(length) {
    let result = ''
    for (var i = 0; i < length; i++) {
        result += possibleChars[Math.floor(possibleChars.length * Math.random())]
    }
    return result
}


describe('createResponsiveStateReducer', function () {
    describe('with default breakpoints', function () {
        // assigned in `beforeEach`
        let reducer


        beforeEach(function () {
            reducer = createResponsiveStateReducer()
        })


        it('returns a function', function () {
            expect(isFunction(reducer)).to.be.true
        })
    })


    describe('with custom breakpoints', function () {
        // number of breakpoints to randomly generate
        const numBreakpoints = Math.floor(10 * Math.random())
        // maximum length of randomly generated media type strings
        const mediaTypeMaxLength = 50
        // maximum value for randomly generated breakpoint values
        const breakpointMaxValue = 10000

        // assigned in `beforeEach`
        let reducer
        let breakpoints


        beforeEach(function () {
            // randomly generate breakpoints object
            breakpoints = {}
            for (var i = 0; i < numBreakpoints; i++) {
                const mediaType = randomString(Math.ceil(mediaTypeMaxLength * Math.random()))
                const breakpoint = Math.floor(breakpointMaxValue * Math.random())

                breakpoints[mediaType] = breakpoint
            }
            // create reducer based on random breakpoints
            reducer = createResponsiveStateReducer(breakpoints)
        })


        describe('the reducer', function () {
            // maximum length of randomly generated action type strings
            const actionTypeMaxLength = 50


            it('is a function', function () {
                expect(isFunction(reducer)).to.be.true
            })


            it('returns the input state for unknown actions and state !== undefined', function () {
                // randomly generate an action
                const action = {
                    type: randomString(Math.ceil(actionTypeMaxLength * Math.random()))
                }
                // non-undefined input state
                const state = Math.random()

                // should return unaltered state
                expect(reducer(state, action)).to.equal(state)
            })
        })

        describe("when computing breakpoint ordering", function() {
            // the breakpoints to test against
            const breakpointOrdering = getOrderMap({
                small: 500,
                medium: 800,
                large: 1000,
                foo: 'bar',
            })

            it('correctly orders two breakpoints', function() {
                // figure out the ordering for the smaller one
                const smallerOrder = breakpointOrdering['small']
                // figure out the ordering for the larger one
                const largerOrder = breakpointOrdering['large']

                // make sure the larger order is bigger than the smaller
                expect(largerOrder > smallerOrder).to.be.true
            })

            it('correctly order words relative to numbers', function() {
                // figure out the number order
                const numberOrder = breakpointOrdering['small']
                // figure out the word order
                const wordOrder = breakpointOrdering['foo']

                // make sure the word is larger than the number
                expect(wordOrder > numberOrder).to.be.true
            })
        })
    })

    describe('reducer factory', function() {

        const breakpoints = {
            small: 500,
            medium: 1000,
            large: 15000
        }

        it('correctly injects initial state', function() {
            // create a reducer with the initial state
            const reducer = createResponsiveStateReducer(breakpoints, {
                initialMediaType: 'small',
            })
            // create a redux store with the reducer
            const store = createStore(reducer)

            // the expected value for the lessThan object
            const expectedLessThan = {
                small: false,
                medium: true,
                large: true,
                infinity: true,
            }

            // make sure we were able to correctly inject the initial state
            expect(store.getState().lessThan).to.deep.equal(expectedLessThan)
        })


    })

    // the breakpoints to test against
    const breakpoints = {
        small: 0,
        medium: 1,
        large: 2,
    }

    it('can compute the less than object', function() {
        // the current media type
        const currentType = 'medium'
        // the expectation lessThan
        const expected = {
            small: false,
            medium: false,
            large: true,
        }
        // make sure the computed lessThan object matches exepctation
        expect(getLessThan(currentType, breakpoints)).to.deep.equal(expected)
    })

    it('can compute the greater than object', function() {
        // the current media type
        const currentType = 'medium'
        // the expectation lessThan
        const expected = {
            small: true,
            medium: false,
            large: false,
        }
        // make sure the computed lessThan object matches exepctation
        expect(getGreaterThan(currentType, breakpoints)).to.deep.equal(expected)
    })

    it('can compute the is object', function() {
        // the current media type
        const currentType = 'medium'
        // the expectation lessThan
        const expected = {
            small: false,
            medium: true,
            large: false,
        }
        // make sure the computed lessThan object matches exepctation
        expect(getIs(currentType, breakpoints)).to.deep.equal(expected)
    })
})
