import React, { Component } from "react";

import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { connect, ConnectedProps } from "react-redux";
import ExpressionTable from "../../layout/expression_table/ExpresionTable";
import { Expression } from "../../../types/Expression";
import { ExpressionAction } from "../../redux/actions/expression/expression.action.types";
import { expression_activate, expression_add, expression_deactivate, expression_remove } from "../../redux/actions/expression/expression.action";

interface StateToProps {
    expressions: Array<Expression>
}

interface DispatchToProps {
    add_expression: (expression: string) => void
    remove_expression: (expression: Expression) => void
    activate_expression: (expression: Expression) => void
    deactivate_expression: (expression: Expression) => void
}

const map_state_to_props = (state: RootState): StateToProps => {
    return {
        expressions: state.expressions.exception
    };
};

const map_dispatch_to_props = (dispatch: ThunkDispatch<RootState, undefined, ExpressionAction>): DispatchToProps => {
    return {
        add_expression: async (expression: string) => {
            return dispatch(expression_add(expression, "EXCEPTION"));
        },
        remove_expression: async (expression: Expression) => {
            return dispatch(expression_remove({...expression, category: "EXCEPTION"}));
        },
        activate_expression: async (expression: Expression) => {
            return dispatch(expression_activate({...expression, category: "EXCEPTION"}));
        },
        deactivate_expression: async (expression: Expression) => {
            return dispatch(expression_deactivate({...expression, category: "EXCEPTION"}));
        }
    };
};

const connector = connect<
    StateToProps,
    DispatchToProps,
    unknown,
    RootState
>(map_state_to_props, map_dispatch_to_props);

type PropsFromRedux = ConnectedProps<typeof connector>

type ExpressionExceptionTableProps = PropsFromRedux // & IInformeProps

class ExpressionExceptionTable extends Component<ExpressionExceptionTableProps> {
    constructor(props: ExpressionExceptionTableProps){
        super(props);
        this.onAddRegexButtonClick = this.onAddRegexButtonClick.bind(this);
        this.onExpressionStateCheckboxChange = this.onExpressionStateCheckboxChange.bind(this);
        this.onRemoveExpressionClick = this.onRemoveExpressionClick.bind(this);
    }
    onAddRegexButtonClick(add_regex_value: string) {
        const {add_expression} = this.props;
        add_expression(add_regex_value);
    }
    onExpressionStateCheckboxChange(expression: Expression) {
        const { activate_expression, deactivate_expression } = this.props;
        if (expression.state)
            deactivate_expression(expression);
        else
            activate_expression(expression);
    }
    onRemoveExpressionClick(expression: Expression) {
        const { remove_expression } = this.props;
        remove_expression(expression);
    }
    render(): JSX.Element {
        const {expressions} = this.props;
        return (
            <ExpressionTable
                expressions={expressions}
                add_expression={this.onAddRegexButtonClick}
                delete_expression={this.onRemoveExpressionClick}
                update_expression_state={this.onExpressionStateCheckboxChange}
            />
        );
    }
}

export default connector(ExpressionExceptionTable);
