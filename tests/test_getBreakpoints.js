// third party imports
import isFunction from 'lodash/isFunction'
import {createStore, combineReducers} from 'redux'
import { combineReducers as immutableCombine } from 'redux-immutablejs'
// local imports
import getBreakpoints from 'util/getBreakpoints'
import {defaultBreakpoints} from 'util/createResponsiveStateReducer'
import {responsiveStateReducer} from '../src'


describe('Breakpoint discovery', function () {
    it('Can find reducer at root', function () {
        // create a redux store with the reducer at the root
        const store = createStore(combineReducers({
            browser: responsiveStateReducer
        }))

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).to.equal(defaultBreakpoints)
    })


    it('Can find immutable js reducers', function() {
        // create a redux store with the reducer at the root
        const store = createStore(immutableCombine({
            browser: responsiveStateReducer
        }))

        // make sure we could retrieve the default breakpoints from the store
        expect(getBreakpoints(store)).to.equal(defaultBreakpoints)
    })


    it('Complains if it cannot find a reducer at root', function() {
        // create a store without the reducer at reducer
        const store = createStore(combineReducers({
            hello: () => true
        }))

        // make sure this throws an error
        expect(() => getBreakpoints(store)).to.throw(Error)
    })
})
