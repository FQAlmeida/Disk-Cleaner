import React, { Component } from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    TableBody,
    Switch,
    Container,
    TextField,
    Button
} from "@material-ui/core";


class ExpressionTable extends Component{
    render(): JSX.Element {
        return (
            <Container>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell width="15%">Status</TableCell>
                                <TableCell>Expression</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Switch />
                                </TableCell>
                                <TableCell>Expression</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Switch />
                                </TableCell>
                                <TableCell>Expression</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="add-regex-form">
                    <TextField label="New Regex" variant="outlined" size="small" />
                    <Button className="add-buttom" variant="contained" color="primary">Add</Button>
                </div>
            </Container>
        );
    }
}

export default ExpressionTable;
