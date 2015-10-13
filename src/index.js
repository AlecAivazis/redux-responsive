// local imports
import createResponsiveStateReducer from './util/createResponsiveStateReducer'
import addResponsiveHandlers from './util/addResponsiveHandlers'


export default {
    createResponsiveStateReducer,
    addResponsiveHandlers,
    // provide the default responsive state reducer
    responsiveStateReducer: addResponsiveHandlers(),
}
