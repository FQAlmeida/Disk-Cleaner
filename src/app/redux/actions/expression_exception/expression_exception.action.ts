import { Expression, ExpressionTemporary } from "../../../../types/Expression";
import { EXPRESSION_EXCEPTION } from "./expression_exception.action.const";
import { ExpressionExceptionActionAdd, ExpressionExceptionActionOptions } from "./expression_exception.action.types";

export const expression_add = (expression: string): ExpressionExceptionActionAdd => {
    const new_expression: ExpressionTemporary = {
        id: undefined,
        state: true,
        expression: expression
    };
    return {
        type: EXPRESSION_EXCEPTION.ADD,
        expression: new_expression
    };
};
export const expression_remove = (expression: Expression): ExpressionExceptionActionOptions => {
    return {
        type: EXPRESSION_EXCEPTION.REMOVE,
        expression: expression
    };
};
export const expression_activate = (expression: Expression): ExpressionExceptionActionOptions => {
    return {
        type: EXPRESSION_EXCEPTION.ACTIVATE,
        expression: expression
    };
};
export const expression_deactivate = (expression: Expression): ExpressionExceptionActionOptions => {
    return {
        type: EXPRESSION_EXCEPTION.DEACTIVATE,
        expression: expression
    };
};
