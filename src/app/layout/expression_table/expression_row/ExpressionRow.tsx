import React, { Component } from "react";
import {
    TableRow,
    TableCell,
    IconButton,
    Checkbox
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { Expression } from "../../../../types/Expression";

interface ExpressionRowProps {
    expression: Expression
    update_expression_state: (expression: Expression) => void
    delete_expression: (expression: Expression) => void
}

class ExpressionRow extends Component<ExpressionRowProps> {
    constructor(props: ExpressionRowProps) {
        super(props);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onDeleteButtomClick = this.onDeleteButtomClick.bind(this);

    }
    onCheckboxChange(expression: Expression): () => void {
        const { update_expression_state } = this.props;
        return function () {
            update_expression_state(expression);
        };
    }
    onDeleteButtomClick(expression: Expression): () => void {
        const { delete_expression } = this.props;
        return function () {
            delete_expression(expression);
        };
    }
    render(): JSX.Element {
        const { expression } = this.props;
        return (
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox checked={expression.state} onChange={this.onCheckboxChange(expression)} />
                </TableCell>
                <TableCell>{expression.expression}</TableCell>
                <TableCell align="right" width="10%">
                    <IconButton edge="end" aria-label="delete" size="small" onClick={this.onDeleteButtomClick(expression)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }
}
export default ExpressionRow;
