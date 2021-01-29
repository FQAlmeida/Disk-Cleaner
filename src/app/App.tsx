import React, { Component } from "react"
import Layout from "./layout/Layout"

import "./sass/App.sass"

interface AppState { }
interface AppProps { }

class App extends Component<AppProps, AppState> {
    render() {
        return (
            <Layout>
                Layout Child
            </Layout>
        )
    }
}

export default App
