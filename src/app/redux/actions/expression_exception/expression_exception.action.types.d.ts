import { EXPRESSION_EXCEPTION } from "./expression_exception.action";
import {Expression} from "../../types/Expression";

export interface IExpressionExceptionAction {
    type: EXPRESSION_EXCEPTION
    expression: Expression
}
