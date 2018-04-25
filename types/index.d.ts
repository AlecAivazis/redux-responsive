// TypeScript Version: 2.3

import { Reducer, StoreEnhancer } from 'redux';

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

export interface IResponsiveReducerOptions<BP = IBreakPoints, EF = {}> {
    initialMediaType?: string;
    infinity?: string;
    extraFields?(breakPoints: IBrowser<BP>): EF;
}

export interface IResponsiveEnhancerOptions {
    calculateInitialState?: boolean;
}

/*
`breakpoints?: BP` doesn't work when we call

    createResponsiveStateReducer(undefined, {}) // BP is undefined here instead of defaults

so instead we use overloads
*/
export function createResponsiveStateReducer(): Reducer<IBrowser>;
export function createResponsiveStateReducer<
    BP extends IBreakPoints<string>,
    EF = {}
>(breakpoints: BP, options?: IResponsiveReducerOptions<BP, EF>): Reducer<IBrowser<BP> & EF>;
export function createResponsiveStateReducer<
    EF = {}
>(breakpoints: undefined | null, options?: IResponsiveReducerOptions<IBreakPoints, EF>): Reducer<IBrowser & EF>;

export function createResponsiveStoreEnhancer(options?: IResponsiveEnhancerOptions): StoreEnhancer;

export const responsiveStateReducer: Reducer<IBrowser>;

export const responsiveStoreEnhancer: StoreEnhancer;

export interface ICalculateResponsiveStateAction {
    type: "redux-responsive/CALCULATE_RESPONSIVE_STATE";
}

export type IWindowLike = Pick<Window, "innerWidth" | "innerHeight" | "matchMedia">;
export function calculateResponsiveState(window: IWindowLike): ICalculateResponsiveStateAction;
