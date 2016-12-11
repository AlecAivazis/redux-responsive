// external imports
import {createStore, combineReducers} from 'redux'
// local imports
import {
    responsiveStoreEnhancer,
    responsiveStateReducer,
    createResponsiveStoreEnhancer,
    createResponsiveStateReducer
} from '../src'


describe('PerformanceMode handlers', function () {
    it('calcuates the initial state by default', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: responsiveStateReducer,
        })
        // create the enhanced store
        const store = createStore(reducer, responsiveStoreEnhancer)
        // get the current state of the browser
        const {browser} = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).to.be.false
    })

    it('does not calcuate the initial state when flagged', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: responsiveStateReducer,
        })
        // create the enhanced store
        const store = createStore(reducer, createResponsiveStoreEnhancer({calculateInitialState: false}))
        // get the current state of the browser
        const {browser} = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).to.be.true
    })

    it('resizes only when browser width changes to new media query')
})
