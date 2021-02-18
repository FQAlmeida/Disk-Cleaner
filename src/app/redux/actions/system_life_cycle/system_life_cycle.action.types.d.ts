import { SYSTEM_LIFE_CYCLE } from "./system_life_cycle.action.const";

export interface SystemLifeCycleActionLoad {
    type: SYSTEM_LIFE_CYCLE.LOAD
}

export interface SystemLifeCycleActionSave {
    type: SYSTEM_LIFE_CYCLE.SAVE
}
export type SystemLifeCycleAction =  SystemLifeCycleActionLoad | SystemLifeCycleActionSave
