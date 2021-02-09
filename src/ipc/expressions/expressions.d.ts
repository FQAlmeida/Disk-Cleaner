import { Expression } from "../../types/Expression";

type expressions_config = {
    expressions_finder: Array<Expression>, expressions_exception: Array<Expression>
} 

export type Events = {
    expressions_finder_updated: (expressions: expressions_config) => void
}

export type Commands = {
    fetch_commands: () => expressions_config
    update_expression: (expressions: expressions_config) => void
}
