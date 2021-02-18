import { ExpressionsStructure } from "../../../../types/ExpressionStructure";
import { Expression } from "../../../../types/Expression";
import { EXPRESSION } from "../../actions/expression/expression.action.const";
import { ExpressionAction, ExpressionActionAdd, ExpressionActionAddBulk, ExpressionActionLoad, ExpressionActionOptions, ExpressionActionSave } from "../../actions/expression/expression.action.types";

export interface ExpressionState {
    finder: Array<Expression>,
    exception: Array<Expression>
}

export const expression_initial_state: ExpressionState = {
    finder: [],
    exception: []
};
const upd_state_bulk = (
    old_state: ExpressionState,
    action: ExpressionActionAddBulk | ExpressionActionLoad,
): ExpressionsStructure => {
    return {
        ...old_state,
        finder: [
            ...old_state.finder.filter(expression => !action.expressions.finder.map(expression => expression.id).includes(expression.id)),
            ...action.expressions.finder
        ].sort((expression_a, expression_b) => expression_a.id - expression_b.id),
        exception: [
            ...old_state.exception.filter(expression => !action.expressions.exception.map(expression => expression.id).includes(expression.id)),
            ...action.expressions.exception
        ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
    };
};
const upd_state = (
    old_state: ExpressionState,
    action: Exclude<ExpressionAction, ExpressionActionAddBulk | ExpressionActionSave | ExpressionActionLoad>,
    new_expression?: Expression
): ExpressionsStructure => {
    if (!new_expression) {
        return upd_state_remove(old_state, action);
    }
    if (action.expression.category == "FIND") {
        return {
            ...old_state,
            finder: [
                ...old_state.finder.filter((expression) => expression.id !== new_expression.id),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };

    } else {
        return {
            ...old_state,
            exception: [
                ...old_state.exception.filter((expression) => expression.id !== new_expression.id),
                new_expression
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
};
const upd_state_remove = (
    old_state: ExpressionState,
    action: Exclude<ExpressionAction, ExpressionActionAddBulk | ExpressionActionSave | ExpressionActionLoad>,
): ExpressionsStructure => {
    if (action.expression.category == "FIND") {
        return {
            ...old_state,
            finder: [
                ...old_state.finder.filter((expression) => expression.id !== action.expression.id),
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };

    } else {
        return {
            ...old_state,
            exception: [
                ...old_state.exception.filter((expression) => expression.id !== action.expression.id),
            ].sort((expression_a, expression_b) => expression_a.id - expression_b.id)
        };
    }
};
const expression_add = (state: ExpressionState, action: ExpressionActionAdd) => {
    if (action.type !== EXPRESSION.ADD) throw new Error("Action type invalid!");
    const expressions = action.expression.category === "FIND" ? state.finder : state.exception;
    const max_id = Math.max(...expressions.map((value) => value.id), 0);
    const old_expression = expressions.find((expression) => expression.expression === action.expression.expression);
    if (old_expression) {
        // dispatch error?
        return state;
    }
    const new_expression: Expression = {
        ...action.expression,
        id: max_id + 1
    };
    return upd_state(state, action, new_expression);
};
const expression_remove = (state: ExpressionState, action: ExpressionActionOptions) => {
    if (action.type !== EXPRESSION.REMOVE) throw new Error("Action type invalid!");
    return upd_state(state, action);
};
const expression_update = (state: ExpressionState, action: ExpressionActionOptions, new_expr_state: boolean) => {
    if (action.type !== EXPRESSION.DEACTIVATE && action.type !== EXPRESSION.ACTIVATE) throw new Error("Action type invalid!");
    const expressions = action.expression.category === "FIND" ? state.finder : state.exception;
    const expression_temp = expressions.find((expression) => expression.id === action.expression.id);
    if (!expression_temp) return state;
    const new_expression: Expression = {
        ...expression_temp,
        state: new_expr_state
    };
    return upd_state(state, action, new_expression);
};

const expression_add_bulk = (state: ExpressionState, action: ExpressionActionAddBulk) => {
    if (action.type !== EXPRESSION.ADD_BULK) throw new Error("Action type invalid!");
    return upd_state_bulk(state, action);
};

const expression_load = (state: ExpressionState, action: ExpressionActionLoad) => {
    if (action.type !== EXPRESSION.LOAD) throw new Error("Action type invalid!");
    return upd_state_bulk(state, action);
};

const expression_save = (state: ExpressionState, action: ExpressionActionSave) => {
    if (action.type !== EXPRESSION.SAVE) throw new Error("Action type invalid!");
    return state;
};

export const expression_reducer = (state: ExpressionState = expression_initial_state, action: ExpressionAction): ExpressionState => {
    switch (action.type) {
    case EXPRESSION.ADD: {
        return expression_add(state, action);
    }
    case EXPRESSION.ADD_BULK: {
        return expression_add_bulk(state, action);
    }
    case EXPRESSION.LOAD: {
        return expression_load(state, action);
    }
    case EXPRESSION.SAVE: {
        return expression_save(state, action);
    }
    case EXPRESSION.REMOVE: {
        return expression_remove(state, action);
    }
    case EXPRESSION.ACTIVATE: {
        return expression_update(state, action, true);
    }
    case EXPRESSION.DEACTIVATE: {
        return expression_update(state, action, false);
    }
    }
    return state;
};
