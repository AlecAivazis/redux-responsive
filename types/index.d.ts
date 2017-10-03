// TypeScript Version: 2.1

import {
    AnyAction,
    Reducer,
    GenericStoreEnhancer
} from 'redux';

export interface IBreakPoints {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
    infinity: number;
}

export interface IBreakPointResults {
    extraSmall: boolean;
    small: boolean;
    medium: boolean;
    large: boolean;
    extraLarge: boolean;
    infinity: boolean;
}

export interface IBrowser {
    _responsiveState: boolean;
    mediaType: string;
    orientation: string;
    lessThan: IBreakPointResults;
    greaterThan: IBreakPointResults;
    is: IBreakPointResults;
    breakpoints: IBreakPoints;
}

export interface IResponsiveReducerOptions {
    initialMediaType?: string;
    infinity?: string;
    extraFields?(breakPoints?: IBreakPoints): any;
}

export interface IResponsiveEnhancerOptions {
    calculateInitialState?: boolean;
}

export function createResponsiveStateReducer(breakpoints?: IBreakPoints, options?: IResponsiveReducerOptions): Reducer<IBrowser>;

export function createResponsiveStoreEnhancer(options?: IResponsiveEnhancerOptions): GenericStoreEnhancer;

export const responsiveStateReducer: Reducer<IBrowser>;

export const responsiveStoreEnhancer: GenericStoreEnhancer;
