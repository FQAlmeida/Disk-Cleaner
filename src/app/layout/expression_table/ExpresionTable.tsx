import React, { ChangeEvent, Component, Fragment, MouseEvent } from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    TableBody,
    Container,
    TextField,
    Button,
    TablePagination
} from "@material-ui/core";

import ExpressionRow from "./expression_row/ExpressionRow";
import { Expression } from "../../../types/Expression";

import "./sass/ExpressionTable.sass";

interface ExpressionTableState {
    add_regex_value: string,
    pagination: {
        page: number
        rows_per_page: number
    }
}

interface ExpressionTableProps {
    expressions: Array<Expression>
    add_expression: (expression: string) => void
    update_expression_state: (expression: Expression) => void
    delete_expression: (expression: Expression) => void
}

class ExpressionTable extends Component<ExpressionTableProps, ExpressionTableState> {
    initial_state: ExpressionTableState = { add_regex_value: "", pagination: { page: 0, rows_per_page: 4 } }
    constructor(props: ExpressionTableProps) {
        super(props);
        this.state = this.initial_state;
        this.renderRows = this.renderRows.bind(this);
        this.onAddRegexButtonClick = this.onAddRegexButtonClick.bind(this);
        this.onAddRegexTextChange = this.onAddRegexTextChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }
    renderRows(): JSX.Element {
        const { expressions, update_expression_state, delete_expression } = this.props;
        const { pagination } = this.state;
        const emptyRows = pagination.rows_per_page - Math.min(pagination.rows_per_page, expressions.length - pagination.page * pagination.rows_per_page);
        const rows = expressions.slice(pagination.page * pagination.rows_per_page, pagination.page * pagination.rows_per_page + pagination.rows_per_page).map((expression, index) => {
            return (
                <ExpressionRow expression={expression} update_expression_state={update_expression_state}
                    delete_expression={delete_expression} key={index} />

            );
        });

        return (
            <Fragment>
                {rows}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 39 * emptyRows }}>
                        <TableCell colSpan={3} />
                    </TableRow>
                )}
            </Fragment>
        );
    }
    onAddRegexButtonClick(): void {
        const { add_expression, expressions } = this.props;
        const { add_regex_value } = this.state;
        add_expression(add_regex_value);
        this.setState(state => {
            return {
                add_regex_value: this.initial_state.add_regex_value,
                pagination: {
                    rows_per_page: state.pagination.rows_per_page,
                    page: Math.floor(expressions.length / state.pagination.rows_per_page)
                }
            };
        });
    }
    onAddRegexTextChange(event: ChangeEvent<HTMLInputElement>): void {
        const new_value = event.target.value;
        this.setState(state => {
            return {
                ...state,
                add_regex_value: new_value
            };
        });
    }
    onChangePage(_: MouseEvent<HTMLButtonElement> | null, page: number): void {
        this.setState(state => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: page
                }
            };
        });
    }
    render(): JSX.Element {
        const { add_regex_value, pagination } = this.state;
        const { expressions } = this.props;
        return (
            <Container>
                <TablePagination
                    component="div"
                    count={expressions.length}
                    rowsPerPageOptions={[]}
                    rowsPerPage={4}
                    page={pagination.page}
                    onChangePage={this.onChangePage}
                />
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="15%">Status</TableCell>
                                <TableCell colSpan={2}>Expression</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderRows()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="add_regex_form">
                    <TextField label="New Regex" variant="outlined" size="small" value={add_regex_value} onChange={this.onAddRegexTextChange} />
                    <Button className="add_buttom" variant="contained" color="primary" onClick={this.onAddRegexButtonClick}>Add</Button>
                </div>
            </Container>
        );
    }
}

export default ExpressionTable;
