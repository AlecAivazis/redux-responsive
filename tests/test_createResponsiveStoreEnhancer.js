// third party imports
import isFunction from 'lodash/isFunction'
// local imports
import createResponsiveStoreEnhancer from 'util/createResponsiveStoreEnhancer'


describe('createResponsiveStoreEnhancer', function () {
    it('returns a function when given an options object', function () {
        expect(isFunction(createResponsiveStoreEnhancer({}))).to.be.true
    })

    it('returns a function when not given any options', function () {
        expect(isFunction(createResponsiveStoreEnhancer())).to.be.true
    })

    describe('the returned store enhancer', function () {
        let enhancer

        beforeEach(function () {
            enhancer = createResponsiveStoreEnhancer()
        })

        it('returns a function', function () {
            expect(isFunction(enhancer())).to.be.true
        })

        describe('the returned (enhanced) `createStore`', function () {
            let createStoreSpy
            let enhancedCreateStore

            beforeEach(function () {
                function fakeCreateStore() {
                    return {
                        dispatch: () => {},
                    }
                }

                createStoreSpy = sinon.spy(fakeCreateStore)
                enhancedCreateStore = enhancer(createStoreSpy)
            })

            it('calls the `createStore` given to the enhancer', function () {
                enhancedCreateStore()
                expect(createStoreSpy).to.have.been.calledOnce
            })
        })
    })

    it('could use some more tests')
})
