import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    deleteButton: {
        color: theme.palette.error.dark
    },
    fab: {
        marginLeft: "10px",
        minWidth: "40px",
        backgroundColor: theme.palette.accent,
        "&:hover": {
            backgroundColor: theme.palette.accent
        }
    },
    addIngredients: {
        display: "flex",
        alignItems: "center"
    },
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
    button: {
        margin: "20px auto",
        display: "block",
        backgroundColor: theme.palette.accent,
        "&:hover": {
            backgroundColor: theme.palette.accent
        }
    },
    buttonProgress: {
        color: theme.palette.accent,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
    closeButton: {
        position: "absolute",
        right: "6px",
        top: "6px"
    }
}));

const EditModal = props => {
    const {
        activeRecipe,
        setActiveRecipe,
        open,
        handleClose,
        loading,
        saveChanges
    } = props;

    const [ingredientName, setIngredientName] = useState("");

    const changeIngredientName = event => setIngredientName(event.target.value);
    const addIngredient = () => {
        if (ingredientName !== "") {
            const updatedIngredients = [
                ...activeRecipe.ingredients,
                ingredientName
            ];
            setActiveRecipe({
                ...activeRecipe,
                ingredients: updatedIngredients
            });
            setIngredientName("");
        }
    };
    const deleteIngredient = ingredientToDelete => () => {
        const updatedIngredients = [...activeRecipe.ingredients].filter(
            ingredient => ingredient !== ingredientToDelete
        );
        setActiveRecipe({
            ...activeRecipe,
            ingredients: updatedIngredients
        });
    };

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {"Edycja"}
                <IconButton
                    aria-label="Close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        id="name"
                        label="Nazwa"
                        variant="outlined"
                        fullWidth
                        required
                        value={activeRecipe.name}
                        onChange={event =>
                            setActiveRecipe({
                                ...activeRecipe,
                                name: event.target.value
                            })
                        }
                        margin="dense"
                    />
                </form>
                <FormControl
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                >
                    <InputLabel>Czas [min]</InputLabel>
                    <Select
                        value={activeRecipe.time}
                        onChange={event =>
                            setActiveRecipe({
                                ...activeRecipe,
                                time: event.target.value
                            })
                        }
                        input={<OutlinedInput labelWidth={85} id="time" />}
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={45}>45</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                        <MenuItem value={75}>75</MenuItem>
                        <MenuItem value={90}>90</MenuItem>
                        <MenuItem value={105}>105</MenuItem>
                        <MenuItem value={120}>120</MenuItem>
                    </Select>
                </FormControl>
                <Box className={classes.addIngredients}>
                    <TextField
                        id="ingredients"
                        label="Dodaj składnik"
                        variant="outlined"
                        value={ingredientName}
                        onChange={changeIngredientName}
                        fullWidth
                        margin="dense"
                    />
                    <Fab
                        color="secondary"
                        aria-label="Add"
                        className={classes.fab}
                        size="small"
                        onClick={addIngredient}
                    >
                        <AddIcon />
                    </Fab>
                </Box>
                <Box className={classes.ingredientsList}>
                    {activeRecipe !== "" &&
                        activeRecipe.ingredients.map(ingredient => (
                            <Chip
                                key={ingredient}
                                label={ingredient}
                                className={classes.ingredient}
                                onDelete={deleteIngredient(ingredient)}
                                size="small"
                            />
                        ))}
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    onClick={saveChanges}
                    disabled={loading}
                >
                    Zapisz
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditModal;
