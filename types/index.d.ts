// TypeScript Version: 2.3

import {
    Reducer,
    GenericStoreEnhancer
} from 'redux';

export type BreakPointsDefaultNames = "extraSmall" | "small" | "medium" | "large" | "extraLarge" | "infinity";

export type IBreakPoints<BPNames extends string = BreakPointsDefaultNames> = {
    [k in BPNames]: number | string;
};

export type IBreakPointResults<BP = IBreakPoints> = {
    [k in keyof BP]: boolean;
};

export interface IBrowser<BP = IBreakPoints> {
    _responsiveState: boolean;
    mediaType: string;
    orientation: string;
    lessThan: IBreakPointResults<BP>;
    greaterThan: IBreakPointResults<BP>;
    is: IBreakPointResults<BP>;
    breakpoints: BP;
}

export interface IResponsiveReducerOptions<BP = IBreakPoints> {
    initialMediaType?: string;
    infinity?: string;
    extraFields?(breakPoints?: BP): any;
}

export interface IResponsiveEnhancerOptions {
    calculateInitialState?: boolean;
}

export function createResponsiveStateReducer<
    BP extends IBreakPoints<string> = IBreakPoints
>(breakpoints?: BP, options?: IResponsiveReducerOptions<BP>): Reducer<IBrowser<BP>>;

export function createResponsiveStoreEnhancer(options?: IResponsiveEnhancerOptions): GenericStoreEnhancer;

export const responsiveStateReducer: Reducer<IBrowser>;

export const responsiveStoreEnhancer: GenericStoreEnhancer;

export interface ICalculateResponsiveStateAction {
    type: "redux-responsive/CALCULATE_RESPONSIVE_STATE";
}

export function calculateResponsiveState(window: Window): ICalculateResponsiveStateAction;
