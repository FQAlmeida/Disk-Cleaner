import { Expression } from "../../types/Expression";
import { EXPRESSION_EXCEPTION } from "./expression_exception.action.const";
import {IExpressionExceptionAction} from "./expression_exception.action.types";

export const expression_add = (expression: string): IExpressionExceptionAction => {
    const new_expression: Expression = {
        id: undefined,
        state: true,
        expression: expression
    };
    return {
        type: EXPRESSION_EXCEPTION.ADD,
        expression: new_expression
    };
};
export const expression_remove = (expression: Expression): IExpressionExceptionAction => {
    return {
        type: EXPRESSION_EXCEPTION.REMOVE,
        expression: expression
    };
};
export const expression_activate = (expression: Expression): IExpressionExceptionAction => {
    return {
        type: EXPRESSION_EXCEPTION.ACTIVATE,
        expression: expression
    };
};
export const expression_deactivate = (expression: Expression): IExpressionExceptionAction => {
    return {
        type: EXPRESSION_EXCEPTION.DEACTIVATE,
        expression: expression
    };
};
