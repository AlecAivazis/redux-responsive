import {
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    responsiveStateReducer,
    responsiveStoreEnhancer,
    IBrowser,
    calculateResponsiveState,
    IBreakPoints,
} from 'redux-responsive'
import { Action, createStore } from 'redux'

// $ExpectType IResponsiveEnhancer
createResponsiveStoreEnhancer()

// $ExpectType IResponsiveEnhancer
createResponsiveStoreEnhancer({})

// $ExpectType string
createStore(responsiveStateReducer, responsiveStoreEnhancer).getState().orientation

// $ExpectType boolean
createStore(responsiveStateReducer).getState().greaterThan.small

// $ExpectType "redux-responsive/CALCULATE_RESPONSIVE_STATE"
calculateResponsiveState(window).type

const customBreaks: IBreakPoints<'big' | 'veryBig' | 'superBig' | 'print'> = {
    big: 500,
    veryBig: 5000,
    superBig: 50000,
    print: 'print',
}
const reducer = createResponsiveStateReducer(customBreaks)
const store = createStore(reducer)
// $ExpectType boolean
store.getState().greaterThan.superBig
// $ExpectType boolean
store.getState().greaterThan.print
// $ExpectError
store.getState().greaterThan.small

const reducer2 = createResponsiveStateReducer(void 0, {
    extraFields(s) {
        // $ExpectType IBrowser<IBreakPoints<BreakPointsDefaultNames>>
        s
        return { foo: 1 }
    },
})
const store2 = createStore(reducer2)
// $ExpectType number
store2.getState().foo
// $ExpectError
store2.getState().bar

const reducer3 = createResponsiveStateReducer(customBreaks, {
    extraFields(s) {
        // $ExpectType IBrowser<IBreakPoints<"big" | "veryBig" | "superBig" | "print">>
        s
        return { foo: 1 }
    },
})
const store3 = createStore(reducer3)
// $ExpectType number
store3.getState().foo
// $ExpectError
store3.getState().bar
// $ExpectType boolean
store3.getState().greaterThan.print
