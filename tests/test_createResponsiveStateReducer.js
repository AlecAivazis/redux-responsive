// third party imports
import isFunction from 'lodash/isFunction'
// local imports
import createResponsiveStateReducer, { computeOrder } from 'util/createResponsiveStateReducer'


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
            // the breakpoints to test again
            const breakpoints = {
                small: 500,
                medium: 800,
                large: 1000,
                foo: 'bar',
            }

            it('correctly orders two breakpoints', function() {
                // figure out the ordering for the smaller one
                const smallerOrder = computeOrder('small', breakpoints)
                // figure out the ordering for the larger one
                const largerOrder = computeOrder('large', breakpoints)

                // make sure the larger order is bigger than the smaller
                expect(largerOrder > smallerOrder).to.be.true
            })

            it('correctly order words relative to numbers', function() {
                // figure out the number order
                const numberOrder = computeOrder('small', breakpoints)
                // figure out the word order
                const wordOrder = computeOrder('foo', breakpoints)

                // make sure the word is larger than the number
                expect(wordOrder > numberOrder).to.be.true
            })

            it('throws if breakpoint is not in the breakpoint object', function() {
                // make sure it barfs
                expect(() => computeOrder('asdf', breakpoints)).to.throw(Error)
            })
        })
    })


    it('could use some more tests')
})
