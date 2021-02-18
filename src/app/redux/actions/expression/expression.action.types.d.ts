import { ExpressionsStructure } from "../../../../types/ExpressionStructure";
import { ExpressionTemporaryWithCategory, ExpressionWithCategory } from "../../../../types/Expression";
import { EXPRESSION } from "./expression.action.const";

interface ExpressionActionAdd {
    type: EXPRESSION.ADD
    expression: ExpressionTemporaryWithCategory
}

interface ExpressionActionAddBulk {
    type: EXPRESSION.ADD_BULK
    expressions: ExpressionsStructure
}

interface ExpressionActionSave {
    type: EXPRESSION.SAVE
}

interface ExpressionActionLoad {
    type: EXPRESSION.LOAD
    expressions: ExpressionsStructure
}

interface ExpressionActionOptions {
    type: Exclude<EXPRESSION, EXPRESSION.ADD | EXPRESSION.LOAD | EXPRESSION.SAVE | EXPRESSION.ADD_BULK>
    expression: ExpressionWithCategory
}
export type ExpressionAction = ExpressionActionAdd | ExpressionActionOptions | ExpressionActionLoad | ExpressionActionSave | ExpressionActionAddBulk
