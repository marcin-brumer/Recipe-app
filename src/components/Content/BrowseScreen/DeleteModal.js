import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    deleteButton: {
        color: theme.palette.error.dark
    }
}));

const DeleteModal = props => {
    const classes = useStyles();
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>{"Usuń przepis?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Czy na pewno chcesz usunąć wybrany przepis?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Nie
                </Button>
                <Button
                    onClick={props.deleteRecipe}
                    className={classes.deleteButton}
                    autoFocus
                >
                    Tak
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
