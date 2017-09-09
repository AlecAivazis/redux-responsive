declare module 'redux-responsive' {

    export interface IBreakPoints {
        extraSmall: number
        small: number,
        medium: number,
        large: number,
        extraLarge: number,
        infinity: number,
    }

    export interface IBreakPointResults {
        extraSmall: boolean
        small: boolean,
        medium: boolean,
        large: boolean,
        extraLarge: boolean,
        infinity: boolean,
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

    export function createResponsiveStateReducer(breakpoints?: IBreakPoints, options?: IResponsiveReducerOptions)

    export function createResponsiveStoreEnhancer(options?: any): any

    export function responsiveStateReducer(state?: IState, action?: any): any

    export function responsiveStoreEnhancer(): any
}
