import React, { Component } from "react";

import {
    Box
} from "@material-ui/core";

import "./sass/Layout.sass";
import AppBar from "./appbar/AppBar";
import Grid, { gridChildrenType } from "./grid/Grid";

interface LayoutProps {
    children: gridChildrenType
}

class Layout extends Component<LayoutProps> {

    render() : JSX.Element{
        return (
            <Box className="main-box">
                <AppBar />
                <Grid>
                    {this.props.children}
                </Grid>
            </Box>
        );
    }
}

export default Layout;
