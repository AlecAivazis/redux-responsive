# redux-responsive
A redux reducer for managing the responsive state of your application

# Why Use a Flux Store for Responsive Behavior?

There are many solutions for cleanly handling responsive designs in React applications. One common approach is to wrap a component in another component which is responsible for handling the behavior and passing the information down as a prop. While this at first seems good and the "react way", as the behavior gets more complicated, this quickly leads to a lot of boilerplate code in a single component. Also, depending on the implementation, it is possible that many copies of the responsive wrapper would create many different resize handlers.

Using a flux store not only reduces the overall noise in a component, but also guarantees that only a single event listener is waiting for resize.

# Creating the Store

All you need to do is wrap the ResponsiveStore in your alt instance's createStore method.

```javascript
// stores/ResponsiveStore.js

// import your singleton alt instance
import alt from 'my-alt-import'
// import our factory
import ResponsiveStore from 'alt-responsive'

// pass the store class to alt's wrapper
export default alt.createStore(ResponsiveStore)
```

Now your store is ready to use. The store's default breakpoints match common device sizes and are accessible by the following names which are used to indentify them in your view:

```
const default_breakpoints = {
    extra_small: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
```

## Using Custom Breakpoints

To use custom breakpoints, import the `create_responsive_store` factory, and pass it an object with the new names and values.

```javascript
// stores/ResponsiveStore.js

// import your singleton alt instance
import alt from 'my-alt-import'
// import our factory
import {create_responsive_store} from 'alt-responsive'

// define your own breakpoints
const breakpoints = {
    small: 320,
    medium: 640,
    big: 960,
    huge: 1024,
}

// pass your breakpoints to the store factory
let ResponsiveStore = create_responsive_store(breakpoints)

// pass the store class to alt's wrapper
export default alt.createStore(ResponsiveStoreClass)
```

Now your store is ready to use with custom breakpoints.

Responding to Browser Width

The ReponsiveStore provides three attributes to handle responsive behavior (passed in as props to the particular component):

current_media_type: (string) The largest breakpoint category that the browser satisfies.
browser_less_than: (object) An object of booleans that indicate whether the browser is currently less than a particular breakpoint.
browser_greater_than: (object) An object of booleans that indicate whether the browser is currently greater than a particular breakpoint.
For example,


}
