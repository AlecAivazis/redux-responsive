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

// $ExpectType Reducer<IBrowser>
createResponsiveStateReducer();

// $ExpectError
createResponsiveStateReducer({});

declare const action: Action;
declare const state: IBrowser;
// $ExpectType IBrowser
responsiveStateReducer(state, action);

// $ExpectType "redux-responsive/CALCULATE_RESPONSIVE_STATE"
calculateResponsiveState(window).type;
