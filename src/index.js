// local imports
import createResponsiveStateReducer from './util/createResponsiveStateReducer'
import createResponsiveStoreEnhancer from './util/createResponsiveStoreEnhancer'
import {CALCULATE_RESPONSIVE_STATE} from './actions/types'
import {calculateResponsiveState} from './actions/creators'
import StyleSheet from './components'

export default {
    calculateResponsiveState,
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    CALCULATE_RESPONSIVE_STATE,
    StyleSheet,
    // provide default responsive state reducer
    responsiveStateReducer: createResponsiveStateReducer(),
    // provide default responsive store enhancer
    responsiveStoreEnhancer: createResponsiveStoreEnhancer(),
}
