import { EXPRESSION_FINDER } from "../../actions/expression_finder/expression_finder.action.const";
import { ExpressionFinderAction } from "../../actions/expression_finder/expression_finder.action.types";
import { Expression } from "../../../../types/Expression";

export interface ExpressionFinderState {
    expressions: Array<Expression>
}

export const expression_finder_initial_state: ExpressionFinderState = {
    expressions: []
};

export const expression_finder_reducer = (state: ExpressionFinderState = expression_finder_initial_state, action: ExpressionFinderAction): ExpressionFinderState => {
    switch (action.type) {
    case EXPRESSION_FINDER.ADD: {
        const max_id = Math.max(...state.expressions.map((value) => value.id), 0);
        const old_expression = state.expressions.find((expression) => expression.expression === action.expression.expression);
        if (old_expression) break;
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
    case EXPRESSION_FINDER.REMOVE: {
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    case EXPRESSION_FINDER.ACTIVATE: {
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
    case EXPRESSION_FINDER.DEACTIVATE: {
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
