// external imports
import React from 'react'
import { StyleSheet } from '../src/react'

const App = ({styles}) => (
    <div style={styles.container}>
        hello world
    </div>
)

const stylesheet = {
    container: {
        background: 'blue',
        _lessThan_medium: {
            background: 'red',
        },
    },
}

export default StyleSheet(stylesheet)(App)
