import React, { Component } from "react";
import {
    Grid as GridMUI
} from "@material-ui/core";

export type gridChildrenType = [unknown, unknown, unknown]

interface GridProps {
    children: gridChildrenType
}

class Grid extends Component<GridProps>{
    render(): JSX.Element {
        return (
            <GridMUI
                container
                xl
                direction="row"
                style={{ height: "calc(100% - 64px)" }}
            >
                <GridMUI
                    container
                    item
                    md={4}
                    lg={4}
                >
                    {this.props.children[0]}
                </GridMUI>
                <GridMUI
                    container
                    item
                    md={8}
                    lg={8}
                >
                    <GridMUI
                        item
                        container
                        alignItems="center"
                    >
                        {this.props.children[1]}
                    </GridMUI>
                    <GridMUI
                        item
                        container
                    >
                        {this.props.children[2]}
                    </GridMUI>
                </GridMUI>
            </GridMUI>
        );
    }
}

export default Grid;
