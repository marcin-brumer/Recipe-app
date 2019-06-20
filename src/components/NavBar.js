import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import CasinoIcon from "@material-ui/icons/Casino";
import ListIcon from "@material-ui/icons/List";

const NavBar = props => {
    return (
        <AppBar position="static" color="primary">
            <Tabs
                value={props.value}
                onChange={props.handleChange}
                variant="fullWidth"
            >
                <Tab icon={<AddIcon />} label="DODAJ" />
                <Tab icon={<CasinoIcon />} label="LOSUJ" />
                <Tab icon={<ListIcon />} label="PRZEGLĄDAJ" />
            </Tabs>
        </AppBar>
    );
};

export default NavBar;
