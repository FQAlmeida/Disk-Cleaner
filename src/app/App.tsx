import React, { Component } from "react";
import ExpressionTable from "./components/expression_table/ExpresionTable";
import Layout from "./layout/Layout";

import "./sass/App.sass";

class App extends Component {
    render(): JSX.Element {
        return (
            <Layout>
                <p>Disks</p>
                <ExpressionTable />
                <ExpressionTable />
            </Layout>
        );
    }
}

export default App;
