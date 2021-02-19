import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import ExpressionExceptionTable from "./components/expression_exception_table/ExpressionExceptionTable";
import ExpressionFinderTable from "./components/expression_finder_table/ExpressionFinderTable";
import Layout from "./layout/Layout";
import { system_life_cycle_load_op , system_life_cycle_save_op } from "./redux/actions/system_life_cycle/system_life_cycle.action";
import { SystemLifeCycleAction } from "./redux/actions/system_life_cycle/system_life_cycle.action.types";
import { RootState } from "./redux/store";

import "./sass/App.sass";

interface MapDispatchToProps {
    load_data: () => void
    save_data: () => void
}

const map_dispatch_to_props = (dispatch: ThunkDispatch<RootState, undefined, SystemLifeCycleAction>): MapDispatchToProps => {
    return {
        load_data: async () => {
            return dispatch(system_life_cycle_load_op());
        },
        save_data: async () => {
            return dispatch(system_life_cycle_save_op());
        }
    };
};

const connector = connect<
    unknown,
    MapDispatchToProps,
    unknown,
    RootState
>(undefined, map_dispatch_to_props);

type AppProps = ConnectedProps<typeof connector>

class App extends Component<AppProps> {
    componentDidMount() {
        this.props.load_data();
    }
    componentWillUnmount(){
        this.props.save_data();
    }
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

export default connector(App);
