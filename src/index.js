// local imports
export createResponsiveStateReducer from './util/createResponsiveStateReducer'
export createResponsiveStoreEnhancer from './util/createResponsiveStoreEnhancer'
export {CALCULATE_RESPONSIVE_STATE} from './actions/types'
export {calculateResponsiveState} from './actions/creators'
export StyleSheet from './components/stylesheet'

// provide default responsive state reducer
export const responsiveStateReducer = createResponsiveStateReducer()
// provide default responsive store enhancer
export const responsiveStoreEnhancer = createResponsiveStoreEnhancer()
