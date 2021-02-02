import { EXPRESSION_FINDER } from "./expresion_finder.action.type";
import { Expression, IExpressionFinderAction } from "./expression_finder.action";

export const expression_add = (expression: string): IExpressionFinderAction => {
    const new_expression: Expression = {
        id: undefined,
        state: true,
        expression: expression
    };
    return {
        type: EXPRESSION_FINDER.ADD,
        expression: new_expression
    };
};
export const expression_remove = (expression: Expression): IExpressionFinderAction => {
    return {
        type: EXPRESSION_FINDER.REMOVE,
        expression: expression
    };
};
export const expression_activate = (expression: Expression): IExpressionFinderAction => {
    return {
        type: EXPRESSION_FINDER.ACTIVATE,
        expression: expression
    };
};
export const expression_deactivate = (expression: Expression): IExpressionFinderAction => {
    return {
        type: EXPRESSION_FINDER.DEACTIVATE,
        expression: expression
    };
};
