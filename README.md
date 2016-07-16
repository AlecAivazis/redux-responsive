# redux-responsive

[![Build Status](https://travis-ci.org/AlecAivazis/redux-responsive.svg?branch=master)](https://travis-ci.org/AlecAivazis/redux-responsive)

A redux reducer for managing the responsive state of your application. Documentation is hosted [here](https://alecaivazis.gitbooks.io/redux-responsive/content/).

# Why Use a Flux Store for Responsive Behavior?

redux-responsive **does not require that you use React as your view library**.  However, since that is what is commonly used alongside redux, this documentation employs common React patterns.

There are many solutions for cleanly handling responsive designs in React applications. One common approach is to wrap a component in another component which is responsible for handling the behavior and passing the information down as a prop. While this at first seems good and the "react way", as the behavior gets more complicated, this quickly leads to a lot of boilerplate code in a single component. Also, depending on the implementation, it is possible that many copies of the responsive wrapper would create many different resize handlers.

Using a specialized store not only reduces the overall noise in a component, but also guarantees that only a single event listener is listening for resize.

# Setup

First, add the reducer somewhere in your reducer tree.  It's just a reducer so you can put it wherever you want! For example, you could put it in your top level call to `combineReducers`.

```js
// reducer.js
import {combineReducers} from 'redux'
import {responsiveStateReducer} from 'redux-responsive'

export default combineReducers({
    browser: responsiveStateReducer,
})
```

Second, you must add the resize handlers to the window.  To do this, use the provided store enhancer.

```js
// store.js

import {createStore} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(reducer, responsiveStoreEnhancer)

// or, if you have an initial state for the store
const store = createStore(reducer, initialState, responsiveStoreEnhancer)

export default store
```

Note that if you are also using some [middlewares](http://redux.js.org/docs/advanced/Middleware.html), the call will look more like this:

```js
import {createSore, applyMiddlewares, compose} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(
    reducer,
    compose(
        responsiveStoreEnhancer,
        applyMiddlewares(middleware1, middleware2)
    )
)

// or, if you have an initial state for the store
const store = createStore(
    reducer,
    initialState,
    compose(
        responsiveStoreEnhancer,
        applyMiddlewares(middleware1, middleware2)
    )
)

export default store
```

Now your store is ready to use. The store's default breakpoints match common device sizes and are accessible by the following names in your view:

```js
const defaultBreakpoints = {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
```


## Using Custom Breakpoints

You can also create your own reducer based on custom breakpoints:

```js
// reducer.js

import {combineReducers} from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'

export default combineReducers({
    browser: createResponsiveStateReducer({
        extraSmall: 500,
        small: 700,
        medium: 1000,
        large: 1280,
        extraLarge: 1400,
    }),
})
```


# The Responsive State

The `responsiveStateReducer` (and the reducer returned by `createResponsiveStateReducer`) adds an object with the following keys to the store:

- `width`: (*number*) The browser width.
- `height`: (*number*) The browser height.
- `mediaType`: (*string*) The largest breakpoint category that the browser satisfies.
- `orientation`: (*string*) The browser orientation. Has three possible values: "portrait", "landscape", or `null`.
- `lessThan`: (*object*) An object of booleans that indicate whether the browser is currently less than a particular breakpoint.
- `greaterThan`: (*object*) An object of booleans that indicate whether the browser is currently greater than a particular breakpoint.
- `lessThanOrEqual`: (*object*) An object of booleans that indicate whether the browser is currently less than or equal to a particular breakpoint.
- `greaterThanOrEqual`: (*object*) An object of booleans that indicate whether the browser is currently greater than or equal to a particular breakpoint.

For example, if you put the responsive state under the key `browser` (as is done in the examples above) then you can access the browser's width and current media type, and determine if the browser is wider than the medium breakpoint like so

```js
// get the current state from the store
const state = store.getState()

// browser width (e.g. 1400)
state.browser.width
// browser height (e.g. 700)
state.browser.height
// browser media type (e.g. "large")
state.browser.mediaType
// browser orientation (takes a null value on desktops)
state.browser.orientation
// true if browser width is greater than the "medium" breakpoint
state.browser.greaterThan.medium
// true if the browser is less than or equal to the "medium" breakpoint
state.browser.lessThanOrEqual.medium
```


# Example Usage

```js
// MyComponent.js

import React from 'react'
import {connect} from 'react-redux'

// grab only the responsive state from the store
// (assuming you have put the `responsiveStateReducer` under
//  the key `browser` in your state tree)
function browserSelector({browser}) {
    return {browser}
}

@connect(browserSelector)
class MyComponent extends React.Component {
    render() {
        // grab the responsive state off of props
        const {browser} = this.props

        let message = `The viewport's current media type is: ${browser.mediaType}.`

        if (browser.lessThan.small) {
            message += 'Secret message for viewports smaller than than the "small" breakpoint!'
        } else if (browser.lessThan.medium) {
            message += 'Secret message for viewports between the "small" and "medium" breakpoints!'
        } else {
            message += 'Message for viewports greater than the "medium" breakpoint.'
        }

        return (
            <p>
                {message}
            </p>
        )
    }
}
```


# Server-side Rendering

Isomorphic applications must make sure that the sever-rendered markup matches the
DOM rendered by the client. Setting the `calculateStateInitially` option in the
`createResponsiveStoreEnhancer` factory method to `false` tells the reducer
to skip the initial responsive state calculation. The responsive state will
contain the default values on both the server and the client side.

```js
// store/configureStore.js

import {createStore} from 'redux'
import {createResponsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(
                    reducer,
                    createResponsiveStoreEnhancer({calculateStateInitially: false}))

export default store
```

The application should explicitly dispatch the action to recalculate the responsive
state when the application is rendered by the client.


```jsx
// client.js

// external imports
import ReactDOM from 'react-dom'
import {calculateResponsiveState} from 'redux-responsive'
// local imports
import store from 'path/to/store'

// render the application
ReactDOM.render(
    <Provider store={store}>
        // ...
    </Provider>,
    document.getElementById('app')
)

// calculate the initial state
store.dispatch(calculateResponsiveState(window))
```

# Higher-Order Components

When building responsive applications in react, it's common to
implement styles for each breakpoint and then apply them like so:

```jsx
const commonStyle = {...}

const styles = {
    element: {
        ...commonStyle,
        color: 'blue',
    },
    elementThin: {
        ...commonStyle,
        color: 'black',
    }
}

// somewhere in your component...

<div style={browser.lessThan.medium ? styles.elementThin : styles.element} />
```

However this becomes very repetitive rather quickly. To help, redux-responsive
provides a higher-order component for managing these styles. The follow is
equivalent to the logic above:

```jsx
import {StyleSheet} from 'redux-responsive/react'

const stylesheet = {
    element: {
        color: 'blue',
        _lessThan_medium: {
            color: 'black',
        }
    }
}

const component = StyleSheet(stylesheet)(({styles}) => (
    <div style={styles.element} />
))
```


# Versioning

[Semver](http://semver.org/) is followed as closely as possible. For updates and migration instructions, see the [changelog](https://github.com/AlecAivazis/redux-responsive/wiki/Changelog).

