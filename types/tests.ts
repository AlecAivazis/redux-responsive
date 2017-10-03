import {
    createResponsiveStateReducer,
    createResponsiveStoreEnhancer,
    responsiveStateReducer,
    responsiveStoreEnhancer,
    IBrowser,
} from "redux-responsive";
import { AnyAction } from "redux";

// $ExpectType IResponsiveStoreEnhancer
createResponsiveStoreEnhancer();

// $ExpectType IResponsiveStoreEnhancer
createResponsiveStoreEnhancer({});

// $ExpectType IResponsiveStateReducer
createResponsiveStateReducer();

// $ExpectError
createResponsiveStateReducer({});

declare const action: AnyAction;
declare const state: IBrowser;
// $ExpectType IBrowser
responsiveStateReducer(void 0, action);
// $ExpectType IBrowser
responsiveStateReducer(state, action);
