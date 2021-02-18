import { ThunkAction } from "redux-thunk";
import { ExpressionsStructure } from "../../../../types/ExpressionStructure";
import { RootState } from "../../store";
import { expressions_load_config, expressions_save_config } from "../expression/expression.action";
import { SYSTEM_LIFE_CYCLE } from "./system_life_cycle.action.const";
import { SystemLifeCycleAction, SystemLifeCycleActionLoad, SystemLifeCycleActionSave } from "./system_life_cycle.action.types";

export const system_life_cycle_load = (): SystemLifeCycleActionLoad => {
    return {
        type: SYSTEM_LIFE_CYCLE.LOAD,
    };
};
export const system_life_cycle_save = (): SystemLifeCycleActionSave => {
    return {
        type: SYSTEM_LIFE_CYCLE.SAVE,
    };
};
export const system_life_cycle_load_op = (): ThunkAction<void, RootState, unknown, SystemLifeCycleAction> => {
    return dispacth => {
        dispacth(system_life_cycle_load());
        dispacth(expressions_load_config());
    };
};
export const system_life_cycle_save_op = (
    expressions: ExpressionsStructure
): ThunkAction<void, RootState, unknown, SystemLifeCycleAction> => {
    return dispatch => {
        dispatch(system_life_cycle_save());
        expressions_save_config(expressions);
    };
};
