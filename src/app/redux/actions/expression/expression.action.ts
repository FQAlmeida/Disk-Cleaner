import { ThunkAction } from "redux-thunk";
import { ExpressionsStructure } from "../../../../types/ExpressionStructure";
import { ExpressionCategories, ExpressionTemporaryWithCategory, ExpressionWithCategory } from "../../../../types/Expression";
import { RootState } from "../../store";
import { EXPRESSION } from "./expression.action.const";
import { ExpressionAction, ExpressionActionAdd, ExpressionActionAddBulk, ExpressionActionLoad, ExpressionActionOptions, ExpressionActionSave } from "./expression.action.types";
import { IpcRendererService } from "../../../../ipc/ipc_renderer";

export const expression_add = (expression: string, category: ExpressionCategories): ExpressionActionAdd => {
    const new_expression: ExpressionTemporaryWithCategory = {
        id: undefined,
        state: true,
        expression: expression,
        category: category
    };
    return {
        type: EXPRESSION.ADD,
        expression: new_expression
    };
};
export const expression_add_bulk = (expressions: ExpressionsStructure): ExpressionActionAddBulk => {
    return {
        type: EXPRESSION.ADD_BULK,
        expressions: expressions
    };
};
export const expression_remove = (expression: ExpressionWithCategory): ExpressionActionOptions => {
    return {
        type: EXPRESSION.REMOVE,
        expression: expression
    };
};
export const expression_activate = (expression: ExpressionWithCategory): ExpressionActionOptions => {
    return {
        type: EXPRESSION.ACTIVATE,
        expression: expression
    };
};
export const expression_deactivate = (expression: ExpressionWithCategory): ExpressionActionOptions => {
    return {
        type: EXPRESSION.DEACTIVATE,
        expression: expression
    };
};
export const expression_load = (expressions: ExpressionsStructure): ExpressionActionLoad => {
    return {
        type: EXPRESSION.LOAD,
        expressions: expressions
    };
};
export const expression_save = (): ExpressionActionSave => {
    return {
        type: EXPRESSION.SAVE,
    };
};
export const expressions_load_config = (): ThunkAction<void, RootState, unknown, ExpressionAction> => async dispatch => {
    const ipc_renderer = new IpcRendererService();
    const expressions = await ipc_renderer.send<never, ExpressionsStructure>("expressions-retrieve");
    console.log("dispatch");
    dispatch(expression_load(expressions));
};
export const expressions_save_config = (expressions: ExpressionsStructure): ThunkAction<void, RootState, unknown, ExpressionAction> => async dispatch => {
    const ipc_renderer = new IpcRendererService();
    ipc_renderer.send<ExpressionsStructure>("expressions-save", { params: expressions }).then(() => {
        dispatch(expression_save());
    }).catch(error => {
        console.error(error);
    });
};
