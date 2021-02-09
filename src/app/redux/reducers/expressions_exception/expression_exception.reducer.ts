import { EXPRESSION_EXCEPTION } from "../../actions/expression_exception/expression_exception.action.const";
import { ExpressionExceptionAction } from "../../actions/expression_exception/expression_exception.action.types";
import { Expression, } from "../../../../types/Expression";

export interface ExpressionExceptionState {
    expressions: Array<Expression>
}

export const expression_exception_initial_state: ExpressionExceptionState = {
    expressions: []
};

export const expression_exception_reducer = (state: ExpressionExceptionState = expression_exception_initial_state, action: ExpressionExceptionAction): ExpressionExceptionState => {
    switch (action.type) {
    case EXPRESSION_EXCEPTION.ADD: {
        const max_id = Math.max(...state.expressions.map((value) => value.id), 0);
        const old_expression  = state.expressions.find((expression) => expression.expression === action.expression.expression);
        if(old_expression) break;
        const new_expression: Expression = {
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
        const expression_temp = state.expressions.find((expression) => expression.id === action.expression.id);
        if (!expression_temp) break;
        const new_expression: Expression = {
            ...expression_temp,
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
        const expression_temp = state.expressions.find((expression) => expression.id === action.expression.id);
        if (!expression_temp) break;
        const new_expression: Expression = {
            ...expression_temp,
            state: false
        };
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    }
    return state;
};
