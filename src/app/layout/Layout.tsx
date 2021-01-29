import React, { Component } from "react"

import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Toolbar, Typography, Divider, Grid } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import "./sass/Layout.sass"

interface LayoutProps { }
interface LayoutState {
    drawer: boolean
}

class Layout extends Component<LayoutProps, LayoutState> {
    constructor(props: LayoutProps) {
        super(props);
        this.state = {
            drawer: false
        }
        this.toggleDrawer = this.toggleDrawer.bind(this)
    }
    toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        this.setState({ drawer: open });
    };
    render() {
        return (
            <Box className="main-box">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Disk Cleaner
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                    <div
                        role="presentation"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <Grid container
                    xl
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    style={{height: "100%"}}>
                    <Grid item
                        justify="center"
                        alignItems="center">Disk List and buttons</Grid>
                    <Grid container item
                        justify="center"
                        alignItems="center">
                        <Grid item
                            justify="center"
                            alignItems="center">Regra</Grid>
                        <Grid item
                            justify="center"
                            alignItems="center">Excessão</Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Layout
