import {Store, StoreCreator} from 'redux';

declare module 'redux-responsive' {

    export interface IBreakPoints {
        extraSmall: number
        small: number
        medium: number
        large: number
        extraLarge: number
        infinity: number
    }

    export interface IBreakPointResults {
        extraSmall: boolean
        small: boolean
        medium: boolean
        large: boolean
        extraLarge: boolean
        infinity: boolean
    }


    export interface IBrowser {
        _responsiveState: boolean
        mediaType: string
        orientation: string
        lessThan: IBreakPointResults
        greaterThan: IBreakPointResults
        is: IBreakPointResults
        breakpoints: IBreakPoints
    }

    export interface IState {
        browser: IBrowser
    }

    export interface IResponsiveReducerOptions {
        initialMediaType: string
        infinity: string
        extraFields: (breakPoints?: IBreakPoints) => any
    }

    interface IResponsiveStateReducer {
        (state?: IState, action?: any): IBrowser
    }

    interface IResponsiveStoreEnhancer {
        (createStore: StoreCreator): Store<any>
    }

    export function createResponsiveStateReducer(breakpoints?: IBreakPoints, options?: IResponsiveReducerOptions): IResponsiveStateReducer

    export function createResponsiveStoreEnhancer(options?: any): IResponsiveStoreEnhancer

    export function responsiveStateReducer(state?: IState, action?: any): IBrowser

    export function responsiveStoreEnhancer(createStore: StoreCreator): Store<any>
}