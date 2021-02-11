import { Expression } from "../../types/Expression";

export interface ExpressionsConfigFile {
    finder: Array<Expression>
    exception: Array<Expression>
}
