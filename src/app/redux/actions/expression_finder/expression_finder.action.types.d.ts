import { EXPRESSION_FINDER } from "./expression_finder.action";

export interface IExpressionFinderAction {
    type: EXPRESSION_FINDER
    expression: Expression
}
