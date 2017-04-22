// external imports
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
// local imports
import {responsiveStateReducer, responsiveStoreEnhancer} from '../src'
import App from './app'

const reducer = combineReducers({
    browser: responsiveStateReducer,
})

const store = createStore(reducer, responsiveStoreEnhancer)


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./app', () => {
        render(App)
    })
}
