// local imports
import triggerResponsiveStateManager from './util/triggerResponsiveStateManager'
import createResponsiveStateReducer from './util/createResponsiveStateReducer'


export default {
    triggerResponsiveStateManager,
    createResponsiveStateReducer,
    // provide the default responsive state reducer
    responsiveStateReducer: createResponsiveStateReducer(),
}
