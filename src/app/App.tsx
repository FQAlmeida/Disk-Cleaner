import React, { Component } from "react";
import ExpressionExceptionTable from "./components/expression_exception_table/ExpressionExceptionTable";
import ExpressionFinderTable from "./components/expression_finder_table/ExpressionFinderTable";
import Layout from "./layout/Layout";

import "./sass/App.sass";

class App extends Component {
    render(): JSX.Element {
        return (
            <Layout>
                <p>Disks</p>
                <ExpressionFinderTable />
                <ExpressionExceptionTable />
            </Layout>
        );
    }
}

export default App;
