// local imports
import addEventHandlers from 'util/addEventHandlers'


describe('addEventHandlers', function () {
    it('returns the store it was given', function () {
        // fake store
        const store = {dispatch: () => ({})}

        // should return same value it is given
        expect(addEventHandlers(store)).to.equal(store)
    })


    it('calls the dispatch property of the store arg', function () {
        const dispatchSpy = sinon.spy()

        addEventHandlers({dispatch: dispatchSpy})

        // should have triggered our dispatch spy exactly once
        expect(dispatchSpy).to.have.been.calledOnce
    })


    it('could use some more tests')
})
