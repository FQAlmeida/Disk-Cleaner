import React, { Component } from "react";

import { IExpressionFinderAction } from "../../redux/actions/expression_finder/expression_finder.action.types";
import { rootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { expression_add, expression_remove, expression_activate, expression_deactivate } from "../../redux/actions/expression_finder/expression_finder.action";
import { connect, ConnectedProps } from "react-redux";
import ExpressionTable from "../../layout/expression_table/ExpresionTable";
import { Expression } from "../../redux/types/Expression";

interface StateToProps {
    expressions: Array<Expression>
}

interface DispatchToProps {
    add_expression: (expression: string) => void
    remove_expression: (expression: Expression) => void
    activate_expression: (expression: Expression) => void
    deactivate_expression: (expression: Expression) => void
}

const map_state_to_props = (state: rootState): StateToProps => {
    return {
        expressions: state.expression_finder.expressions
    };
};

const map_dispatch_to_props = (dispatch: ThunkDispatch<rootState, undefined, IExpressionFinderAction>): DispatchToProps => {
    return {
        add_expression: async (expression: string) => {
            return dispatch(expression_add(expression));
        },
        remove_expression: async (expression: Expression) => {
            return dispatch(expression_remove(expression));
        },
        activate_expression: async (expression: Expression) => {
            return dispatch(expression_activate(expression));
        },
        deactivate_expression: async (expression: Expression) => {
            return dispatch(expression_deactivate(expression));
        }
    };
};

const connector = connect<
    StateToProps,
    DispatchToProps,
    unknown,
    rootState
>(map_state_to_props, map_dispatch_to_props);

type PropsFromRedux = ConnectedProps<typeof connector>

type ExpressionFinderTableProps = PropsFromRedux // & IInformeProps

class ExpressionFinderTable extends Component<ExpressionFinderTableProps> {
    constructor(props: ExpressionFinderTableProps) {
        super(props);
        this.onAddRegexButtonClick = this.onAddRegexButtonClick.bind(this);
        this.onExpressionStateCheckboxChange = this.onExpressionStateCheckboxChange.bind(this);
        this.onRemoveExpressionClick = this.onRemoveExpressionClick.bind(this);
    }
    onAddRegexButtonClick(add_regex_value: string) {
        const { add_expression } = this.props;
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
        const { expressions } = this.props;
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

export default connector(ExpressionFinderTable);
