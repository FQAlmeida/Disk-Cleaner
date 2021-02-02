import { EXPRESSION_FINDER } from "./expresion_finder.action";

export interface Expression {
    id?: number
    state: boolean
    expression: string
}

export interface IExpressionFinderAction {
    type: EXPRESSION_FINDER
    expression: Expression
}
