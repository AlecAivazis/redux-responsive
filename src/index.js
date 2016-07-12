// local imports
import _createResponsiveStateReducer from './util/createResponsiveStateReducer'
import _createResponsiveStoreEnhancer from './util/createResponsiveStoreEnhancer'
export {CALCULATE_RESPONSIVE_STATE} from './actions/types'
export {calculateResponsiveState} from './actions/creators'


export const createResponsiveStateReducer = _createResponsiveStateReducer
export const createResponsiveStoreEnhancer = _createResponsiveStoreEnhancer
// provide default responsive state reducer
export const responsiveStateReducer = createResponsiveStateReducer()
// provide default responsive store enhancer
export const responsiveStoreEnhancer = createResponsiveStoreEnhancer()
