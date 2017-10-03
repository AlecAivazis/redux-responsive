/**
 * Returns the value found in obj at path. Delegates to obj.getIn if available.
 * @param obj
 * @param path
 * @returns {*}
 */
function getIn(obj, path) {
    if (obj.getIn) {
        return obj.getIn(path);
    }
    return path.reduce((accum, next) => accum[next], obj);
}

/**
 * Returns all keys of an object. Delegates to either obj.keys or Object.keys.
 * @param obj
 * @returns {*}
 */

function keys(obj) {
    if (obj.keys) {
        return Array.from(obj.keys());
    }
    return Object.keys(obj);
}

/**
 * An implementation of breadth-first search. Looks for marker key in the tree.
 * @param tree
 * @param marker
 * @param [maxDepth]
 * @returns {*}
 */
function findMarker(tree, marker, maxDepth = 20) {
    const rootPath = [];
    let queue = [rootPath];
    while (queue.length > 0) {
        let currentPath = queue.shift();
        if (currentPath.length > maxDepth) {
            continue;
        }
        let currentObj = getIn(tree, currentPath);
        if (currentObj[marker]) {
            return currentPath;
        }
        keys(currentObj).forEach(k => {
            queue.push(currentPath.concat(k));
        });
    }
    return false;
}

/**
 * Searches through the given redux store and returns the breakpoints found inside.
 * @arg {object} - The redux state.
 * @returns {object} - The breakpoints associated with the responsive state inside the store.
 */
function getBreakpoints(store) {
    // grab the current state of the store
    const storeState = store.getState()

    let responsiveStatePath = findMarker(storeState, '_responsiveState');

    // if we couldn't find a responsive reducer at the root of the project
    if (!responsiveStatePath) {
        throw new Error(
            'Could not find responsive state reducer. '
            + 'If you are still running into trouble, please open a ticket on github.'
        )
    }

    // return the breakpoints in the redux store
    return getIn(storeState, responsiveStatePath).breakpoints;
}

export default getBreakpoints
