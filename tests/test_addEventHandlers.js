// local imports
import addEventHandlers from 'util/addEventHandlers'


describe('addEventHandlers', function () {
    it('returns the store it was given', function () {
        // fake store
        const store = {dispatch: () => ({})}

        // should return same value it is given
        expect(addEventHandlers(store, {throttleTime: 100, calculateStateInitially: true})).to.equal(store)
    })


    it('respects the calculateStateInitially option', function () {
        const dispatchSpy1 = sinon.spy()
        const dispatchSpy2 = sinon.spy()

        addEventHandlers(
            {dispatch: dispatchSpy1},
            {throttleTime: 100, calculateStateInitially: true}
        )

        // should have triggered our dispatch spy exactly once
        expect(dispatchSpy1).to.have.been.calledOnce
        
        addEventHandlers(
            {dispatch: dispatchSpy2},
            {calculateStateInitially: false}
        )

        // should not dispatch recalculation
        expect(!dispatchSpy2.called)
    })


    it('could use some more tests')
})
