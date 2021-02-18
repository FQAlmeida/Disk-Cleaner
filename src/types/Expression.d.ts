export interface ExpressionTemporary {
    id?: number
    state: boolean
    expression: string
}

export type ExpressionCategories = "FIND" | "EXCEPTION"

export interface ExpressionCategory {
    category: ExpressionCategories;
}

export type ExpressionTemporaryWithCategory = ExpressionTemporary & ExpressionCategory

export type ExpressionWithCategory = Required<ExpressionTemporaryWithCategory>

export type Expression = Required<ExpressionTemporary>
