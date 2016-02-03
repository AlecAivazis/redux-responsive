// local imports
import createResponsiveStateReducer from './util/createResponsiveStateReducer'
import createResponsiveStoreEnhancer from './util/createResponsiveStoreEnhancer'


export default {
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    // provide default responsive state reducer
    responsiveStateReducer: createResponsiveStateReducer(),
    // provide default responsive store enhancer
    responsiveStoreEnhancer: createResponsiveStoreEnhancer(),
}
