import {
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    responsiveStateReducer,
    responsiveStoreEnhancer,
    IBrowser, calculateResponsiveState,
} from "redux-responsive";
import { Action, createStore } from "redux";

// $ExpectType GenericStoreEnhancer
createResponsiveStoreEnhancer();

// $ExpectType GenericStoreEnhancer
createResponsiveStoreEnhancer({});

// $ExpectType Reducer<IBrowser<IBreakPoints<BreakPointsDefaultNames>>>
createResponsiveStateReducer();

declare const action: Action;
declare const state: IBrowser;
// $ExpectType boolean
responsiveStateReducer(state, action).greaterThan.small;

// $ExpectType "redux-responsive/CALCULATE_RESPONSIVE_STATE"
calculateResponsiveState(window).type;

const customBreaks = {
    big: 500,
    veryBig: 5000,
    superBig: 50000,
    print: "print",
};
const reducer = createResponsiveStateReducer(customBreaks);
const store = createStore(reducer);
// $ExpectType boolean
store.getState().greaterThan.superBig;
// $ExpectType boolean
store.getState().greaterThan.print;
// $ExpectError
store.getState().greaterThan.small;
