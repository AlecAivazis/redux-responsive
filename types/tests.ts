import {
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    responsiveStateReducer,
    responsiveStoreEnhancer,
    IBrowser,
} from "redux-responsive";
import { AnyAction, createStore } from "redux";

// $ExpectType GenericStoreEnhancer
createResponsiveStoreEnhancer();

// $ExpectType GenericStoreEnhancer
createResponsiveStoreEnhancer({});

// $ExpectType Reducer<IBrowser>
createResponsiveStateReducer();

// $ExpectError
createResponsiveStateReducer({});

declare const action: AnyAction;
declare const state: IBrowser;
// $ExpectType IBrowser
responsiveStateReducer(state, action);
