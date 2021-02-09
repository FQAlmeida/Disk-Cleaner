import { Expression, ExpressionTemporary } from "../../../../types/Expression";
import { EXPRESSION_FINDER } from "./expression_finder.action.const";
import { ExpressionFinderActionAdd, ExpressionFinderActionOptions } from "./expression_finder.action.types";

export const expression_add = (expression: string): ExpressionFinderActionAdd => {
    const new_expression: ExpressionTemporary = {
        id: undefined,
        state: true,
        expression: expression
    };
    return {
        type: EXPRESSION_FINDER.ADD,
        expression: new_expression
    };
};
export const expression_remove = (expression: Expression): ExpressionFinderActionOptions => {
    return {
        type: EXPRESSION_FINDER.REMOVE,
        expression: expression
    };
};
export const expression_activate = (expression: Expression): ExpressionFinderActionOptions => {
    return {
        type: EXPRESSION_FINDER.ACTIVATE,
        expression: expression
    };
};
export const expression_deactivate = (expression: Expression): ExpressionFinderActionOptions => {
    return {
        type: EXPRESSION_FINDER.DEACTIVATE,
        expression: expression
    };
};
