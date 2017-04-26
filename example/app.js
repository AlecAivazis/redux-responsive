// external imports
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from '../src/react'

const App = ({styles, browser}) => (
    <div style={styles.container}>
        hello world
        <br/>
        {JSON.stringify(browser)}
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

const selector = ({browser}) => ({browser})
export default StyleSheet(stylesheet)(connect(selector)(App))
