import { EXPRESSION_FINDER } from "../../actions/expression_finder/expression_finder.action.const";
import { IExpressionFinderAction } from "../../actions/expression_finder/expression_finder.action.types";
import { Expression } from "../../types/Expression";

export interface IExpressionFinderState {
    expressions: Array<Expression>
}

export const expression_finder_initial_state: IExpressionFinderState = {
    expressions: []
};

export const expression_finder_reducer = (state: IExpressionFinderState = expression_finder_initial_state, action: IExpressionFinderAction): IExpressionFinderState => {
    switch (action.type) {
    case EXPRESSION_FINDER.ADD: {
        const max_id = Math.max(...state.expressions.map((value) => value.id), 0);
        console.log(max_id);
        
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
    case EXPRESSION_FINDER.REMOVE: {
        return {
            expressions: [
                ...state.expressions.filter((expression) => expression.id !== action.expression.id),
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
    case EXPRESSION_FINDER.ACTIVATE: {
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
    case EXPRESSION_FINDER.DEACTIVATE: {
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
