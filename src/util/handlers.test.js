// external imports
import {createStore, combineReducers} from 'redux'
// local imports
import createReducer from 'util/createReducer'
import createEnhancer from 'util/createEnhancer'

// create default version of the store bits and pieces
const Reducer = createReducer()
const Enhancer = createEnhancer()


describe('PerformanceMode handlers', function () {
    it('calcuates the initial state by default', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: Reducer,
        })
        // create the enhanced store
        const store = createStore(reducer, Enhancer)
        // get the current state of the browser
        const {browser} = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).toBe(false)
    })

    it('does not calcuate the initial state when flagged', function() {
        // create a store with the default behavior
        const reducer = combineReducers({
            browser: Reducer,
        })
        // create the enhanced store
        const store = createStore(reducer, createEnhancer({calculateInitialState: false}))
        // get the current state of the browser
        const {browser} = store.getState()

        // make sure the browser is not in its biggest state (should be opened at 500 px)
        expect(browser.is.infinity).toBe(true)
    })

    it('resizes only when browser width changes to new media query')
})
