import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: "16px",
        height: "calc(100vh - 72px)"
    }
}));

const TabContainer = props => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>{props.children}</Container>
    );
};

export default TabContainer;
