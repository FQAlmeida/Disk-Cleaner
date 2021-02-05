import { EXPRESSION_EXCEPTION } from "../../actions/expression_exception/expression_exception.action.const";
import { IExpressionExceptionAction } from "../../actions/expression_exception/expression_exception.action.types";
import { Expression } from "../../types/Expression";

export interface IExpressionExceptionState {
    expressions: Array<Expression>
}

export const expression_exception_initial_state: IExpressionExceptionState = {
    expressions: []
};

export const expression_exception_reducer = (state: IExpressionExceptionState = expression_exception_initial_state, action: IExpressionExceptionAction): IExpressionExceptionState => {
    switch (action.type) {
    case EXPRESSION_EXCEPTION.ADD: {
        const max_id = Math.max(...state.expressions.map((value) => value.id), 0);
        const new_expression = {
            ...action.expression,
            id: max_id + 1
        };
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.expression !== new_expression.expression),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    case EXPRESSION_EXCEPTION.REMOVE: {
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    case EXPRESSION_EXCEPTION.ACTIVATE: {
        const new_expression = {
            ...state.expressions.find((expression) => expression.id === action.expression.id),
            state: true
        };
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    case EXPRESSION_EXCEPTION.DEACTIVATE: {
        const new_expression = {
            ...state.expressions.find((expression) => expression.id === action.expression.id),
            state: false
        };
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    default:
        return state;
    }
};
