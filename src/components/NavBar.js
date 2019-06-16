import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import CasinoIcon from "@material-ui/icons/Casino";
import ListIcon from "@material-ui/icons/List";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    indicator: {
        backgroundColor: "#fff"
    }
}));

const NavBar = props => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <AppBar position="static" color="primary">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab icon={<AddIcon />} label="DODAJ" className={classes.tab} />
                <Tab icon={<CasinoIcon />} label="LOSUJ" />
                <Tab icon={<ListIcon />} label="PRZEGLĄDAJ" />
            </Tabs>
        </AppBar>
    );
};

export default NavBar;
