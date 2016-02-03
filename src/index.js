// local imports
import createResponsiveStateReducer from './util/createResponsiveStateReducer'
import addEventHandlers from './util/addEventHandlers'


export default {
    createResponsiveStateReducer,
    addEventHandlers,
    // provide the default responsive state reducer
    responsiveStateReducer: createResponsiveStateReducer(),
}
