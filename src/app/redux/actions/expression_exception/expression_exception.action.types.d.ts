import {Expression, ExpressionTemporary} from "../../../../types/Expression";
import { EXPRESSION_EXCEPTION } from "./expression_exception.action.const";

export interface ExpressionExceptionActionAdd {
    type: EXPRESSION_EXCEPTION.ADD
    expression: ExpressionTemporary
}
export interface ExpressionExceptionActionOptions {
    type: Exclude<EXPRESSION_EXCEPTION, EXPRESSION_EXCEPTION.ADD>
    expression: Expression
}
export type ExpressionExceptionAction =  ExpressionExceptionActionAdd | ExpressionExceptionActionOptions
