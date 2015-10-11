// third party imports
import isFunction from 'lodash/lang/isFunction'
// local imports
import createResponsiveStateReducer from 'util/createResponsiveStateReducer'


const possible_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789'
function randomString(length) {
    let result = ''
    for (var i = 0; i < length; i++) {
        result += possible_chars[Math.floor(possible_chars.length * Math.random())]
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
        const num_breakpoints = Math.floor(10 * Math.random())
        // maximum length of randomly generated media type strings
        const media_type_max_length = 50
        // maximum value for randomly generated breakpoint values
        const breakpoint_max_value = 10000

        // assigned in `beforeEach`
        let reducer
        let breakpoints


        beforeEach(function () {
            // randomly generate breakpoints object
            breakpoints = {}
            for (var i = 0; i < num_breakpoints; i++) {
                const media_type = randomString(Math.ceil(media_type_max_length * Math.random()))
                const breakpoint = Math.floor(breakpoint_max_value * Math.random())

                breakpoints[media_type] = breakpoint
            }
            // create reducer based on random breakpoints
            reducer = createResponsiveStateReducer(breakpoints)
        })


        describe('the reducer', function () {
            // maximum length of randomly generated action type strings
            const action_type_max_length = 50


            it('is a function', function () {
                expect(isFunction(reducer)).to.be.true
            })


            it('returns the input state for unknown actions and state !== undefined', function () {
                // randomly generate an action
                const action = {
                    type: randomString(Math.ceil(action_type_max_length * Math.random()))
                }
                // non-undefined input state
                const state = Math.random()

                // should return unaltered state
                expect(reducer(state, action)).to.equal(state)
            })
        })
    })


    it('could use some more tests')
})
