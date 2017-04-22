// third party imports
import isFunction from 'lodash/isFunction'
import sinon from 'sinon'
// local imports
import createEnhancer from 'util/createEnhancer'
import {defaultBreakpoints} from 'util/createReducer'


describe('createEnhancer', function () {
    it('returns a function when given an options object', function () {
        expect(isFunction(createEnhancer({}))).toBe(true)
    })

    it('returns a function when not given any options', function () {
        expect(isFunction(createEnhancer())).toBe(true)
    })

    describe('the returned store enhancer', function () {
        let enhancer

        beforeEach(function () {
            enhancer = createEnhancer()
        })

        it('returns a function', function () {
            expect(isFunction(enhancer())).toBe(true)
        })

        describe('the returned (enhanced) `createStore`', function () {
            let createStoreSpy
            let enhancedCreateStore

            beforeEach(function () {
                function fakeCreateStore() {
                    return {
                        dispatch: () => {},
                        getState: () => ({
                            browser: {
                                _: true,
                                breakpoints: defaultBreakpoints
                            }
                        })
                    }
                }

                createStoreSpy = sinon.spy(fakeCreateStore)
                enhancedCreateStore = enhancer(createStoreSpy)
            })

            it('calls the `createStore` given to the enhancer', function () {
                enhancedCreateStore()
                sinon.assert.calledOnce(createStoreSpy)
            })
        })
    })

    it('could use some more tests')
})
