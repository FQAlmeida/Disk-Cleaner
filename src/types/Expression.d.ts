export interface ExpressionTemporary {
    id?: number
    state: boolean
    expression: string
}

export type Expression = Required<ExpressionTemporary>
