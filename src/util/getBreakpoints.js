/**
 * Searches through the given redux store and returns the breakpoints found inside.
 * @arg {object} - The redux state.
 * @returns {object} - The breakpoints associated with the responsive state inside the store.
 */
function getBreakpoints(store) {
// grab the current state of the store
    const storeState = store.getState()

    let responsiveStateKey
    // if the redux state root is an Immutable.js Iterable
    if (storeState['@@__IMMUTABLE_ITERABLE__@@'] === true) {
        responsiveStateKey = storeState.findKey(stateBranch => stateBranch._responsiveState)
    } else {
        // go through every reducer at the root of the project
        responsiveStateKey = Object.keys(storeState).reduce((prev, current) => (
            // if the reducer contains the responsive state marker then keep it
            storeState[current] && storeState[current]._responsiveState ? current : prev
        // otherwise the value should be at least falsey
        ), false)
    }

    // if we couldn't find a responsive reducer at the root of the project
    if (!responsiveStateKey) {
        throw new Error(
            'Could not find responsive state reducer. Currently, redux-responsive can only'
            + 'be used if the responsive reducer is at the root of your reducer tree.'
            + 'If you are still running into trouble, please open a ticket on github.'
        )
    }

    // return the breakpoints in the redux store
    return storeState['@@__IMMUTABLE_ITERABLE__@@']
            ? storeState.get(responsiveStateKey).breakpoints
            : storeState[responsiveStateKey].breakpoints
}

export default getBreakpoints
