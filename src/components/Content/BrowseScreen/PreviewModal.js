import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    ingredientsList: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "10px"
    },
    ingredient: {
        margin: "5px",
        backgroundColor: theme.palette.accent,
        "&:hover": {
            backgroundColor: theme.palette.accent
        }
    },
    closeButton: {
        position: "absolute",
        right: "6px",
        top: "6px"
    }
}));

const PreviewModal = props => {
    const { open, handleClose, activeRecipe } = props;
    const classes = useStyles();
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {"Podgląd"}
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="Nazwa"
                    fullWidth
                    value={activeRecipe.name}
                    margin="dense"
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    id="time"
                    label="Czas przygotowania [min]"
                    fullWidth
                    value={activeRecipe.time}
                    margin="dense"
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    id="category"
                    label="Kategoria"
                    fullWidth
                    value={activeRecipe.category}
                    margin="dense"
                    InputProps={{
                        readOnly: true
                    }}
                />
                <Box className={classes.ingredientsList}>
                    {activeRecipe !== "" &&
                        activeRecipe.ingredients.map(ingredient => (
                            <Chip
                                key={ingredient}
                                label={ingredient}
                                className={classes.ingredient}
                                size="small"
                            />
                        ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PreviewModal;
