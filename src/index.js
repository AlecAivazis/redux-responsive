// local imports
import triggerResponsiveStateManager from './util/triggerResponsiveStateManager'
import addResponsiveHandlers from './util/addResponsiveHandlers'


export default {
    triggerResponsiveStateManager,
    addResponsiveHandlers,
    // provide the default responsive state reducer
    responsiveStateReducer: addResponsiveHandlers(),
}
