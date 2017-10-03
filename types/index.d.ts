// TypeScript Version: 2.1

import { Store, StoreCreator, AnyAction } from 'redux';

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

export interface IResponsiveStateReducer {
    (state: IBrowser | undefined, action: AnyAction): IBrowser;
}

export interface IResponsiveStoreEnhancer {
    (createStore: StoreCreator): Store<any>;
}

export function createResponsiveStateReducer(breakpoints?: IBreakPoints, options?: IResponsiveReducerOptions): IResponsiveStateReducer;

export function createResponsiveStoreEnhancer(options?: IResponsiveEnhancerOptions): IResponsiveStoreEnhancer;

export const responsiveStateReducer: IResponsiveStateReducer;

export const responsiveStoreEnhancer: IResponsiveStoreEnhancer;
