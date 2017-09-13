// third party imports
import {createStore, combineReducers} from 'redux'
import { combineReducers as immutableCombine } from 'redux-immutable'
import { Record } from 'immutable'
// local imports
import getBreakpoints from './getBreakpoints'
import createReducer, {defaultBreakpoints} from './createReducer'

const reducer = createReducer()

describe('Breakpoint discovery', function () {
    it('Can find reducer at root', function () {
        // create a redux store with the reducer at the root
        const store = createStore(combineReducers({
            browser: reducer
        }))

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })


    it('Can responsive state in find Immutable.js Map root state', function() {
        // create a redux store with the reducer at the root
        const store = createStore(immutableCombine({
            browser: reducer
        }))

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })


    it('Can responsive state in find Immutable.js Record root state', function() {
        const StateRecord = Record({
          browser: undefined
        })
        // create a redux store with the reducer at the root
        const store = createStore(immutableCombine({
            browser: reducer
        }, StateRecord))

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).toBe(defaultBreakpoints)
    })


    it('Complains if it cannot find a reducer at root', function() {
        // create a store without the reducer at reducer
        const store = createStore(combineReducers({
            hello: () => true
        }))

        // make sure this throws an error
        expect(() => getBreakpoints(store)).toThrowError(Error)
    })
})
