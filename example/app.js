// external imports
import React from 'react'
import { StyleSheet } from '../src/react'

const App = ({styles}) => (
    <div>
        {JSON.stringify(styles)}
    </div>
)

// the stylesheet for the app
const stylesheet = props => {
    console.log(props)
    return {

    }
}

export default StyleSheet(stylesheet)(App)
