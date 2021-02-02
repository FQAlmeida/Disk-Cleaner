import React, { Component, Fragment } from "react";

import AppbarMUI from "@material-ui/core/AppBar";

import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Toolbar, Typography } from "@material-ui/core";
import Drawer from "./drawer/Drawer";

interface AppBarState {
    drawer: boolean
}

class AppBar extends Component<unknown, AppBarState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            drawer: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        this.setState({ drawer: open });
    };
    render(): JSX.Element {
        return (
            <Fragment>
                <AppbarMUI position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Disk Cleaner
                        </Typography>
                    </Toolbar>
                </AppbarMUI>
                <Drawer toggleDrawer={this.toggleDrawer} drawerState={this.state.drawer} />
            </Fragment>
        );
    }
}

export default AppBar;
