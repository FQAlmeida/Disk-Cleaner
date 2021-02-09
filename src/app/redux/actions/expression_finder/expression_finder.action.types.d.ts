import { Expression, ExpressionTemporary } from "../../../../types/Expression";
import { EXPRESSION_FINDER } from "./expression_finder.action.const";

interface ExpressionFinderActionAdd {
    type: EXPRESSION_FINDER.ADD
    expression: ExpressionTemporary
}
interface ExpressionFinderActionOptions {
    type: Exclude<EXPRESSION_FINDER, EXPRESSION_FINDER.ADD>
    expression: Expression
}
export type ExpressionFinderAction =  ExpressionFinderActionAdd | ExpressionFinderActionOptions
