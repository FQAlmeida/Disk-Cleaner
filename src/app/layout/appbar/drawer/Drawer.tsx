import React, { Component } from "react";

import DrawerMUI from "@material-ui/core/Drawer";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface DrawerProps {
    toggle_drawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    drawer_state: boolean
}

class Drawer extends Component<DrawerProps> {
    render(): JSX.Element {
        const { toggle_drawer, drawer_state } = this.props;
        return (
            <DrawerMUI anchor="left" open={drawer_state} onClose={toggle_drawer(false)}>
                <div
                    role="presentation"
                    onClick={toggle_drawer(false)}
                    onKeyDown={toggle_drawer(false)}
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
