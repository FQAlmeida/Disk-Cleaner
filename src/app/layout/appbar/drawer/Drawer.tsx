import React, { Component } from "react";

import DrawerMUI from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface DrawerProps {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    drawerState: boolean
}

class Drawer extends Component<DrawerProps> {
    render(): JSX.Element {
        const { toggleDrawer, drawerState } = this.props;
        return (
            <DrawerMUI anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem button>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Main Page" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary="Configuration" />
                        </ListItem>
                    </List>
                </div>
            </DrawerMUI>);
    }
}

export default Drawer;
