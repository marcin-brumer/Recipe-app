import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import firebase from "../../../firebaseConfig";

const useStyles = makeStyles(theme => ({
    container: {
        padding: "15px 10px 10px"
    },
    textField: {
        marginBottom: "15px"
    },
    addIngredients: {
        display: "flex",
        alignItems: "center"
    },
    fab: {
        marginLeft: "10px",
        minWidth: "48px",
        backgroundColor: theme.palette.accent,
        "&:hover": {
            backgroundColor: theme.palette.accent
        }
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
    success: {
        backgroundColor: theme.palette.primary.main
    },
    error: {
        backgroundColor: theme.palette.error.dark
    }
}));

const AddScreen = props => {
    const inputLabel = useRef(null);

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [labelWidth, setLabelWidth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarType, setSnackbarType] = useState("success");

    const changeName = event => setName(event.target.value);
    const changeTime = event => setTime(event.target.value);
    const changeIngredientName = event => setIngredientName(event.target.value);
    const addIngredient = () => {
        if (ingredientName !== "") {
            setIngredients([...ingredients, ingredientName]);
            setIngredientName("");
        }
    };
    const handleDelete = ingredientToDelete => () => {
        setIngredients(ingredients =>
            ingredients.filter(ingredient => ingredient !== ingredientToDelete)
        );
    };

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const classes = useStyles();

    const resetForm = () => {
        setName("");
        setTime("");
        setIngredients([]);
    };

    const addRecipe = event => {
        event.preventDefault();
        if (name !== "" && time !== "" && ingredients.length > 0) {
            setLoading(true);
            const recipe = {
                name: name,
                time: time,
                ingredients: ingredients,
                date: new Date()
            };
            const db = firebase.firestore();
            db.collection("recipes")
                .add(recipe)
                .then(res => {
                    setLoading(false);
                    resetForm();
                    setSnackbarType("success");
                    setSnackbarStatus(true);
                })
                .catch(err => {
                    setLoading(false);
                    resetForm();
                    setSnackbarType("error");
                    setSnackbarStatus(true);
                });
        }
    };

    return (
        <>
            <form>
                <Paper className={classes.container}>
                    <TextField
                        id="name"
                        label="Nazwa"
                        variant="outlined"
                        value={name}
                        onChange={changeName}
                        className={classes.textField}
                        fullWidth
                        required
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        required
                    >
                        <InputLabel ref={inputLabel}>
                            Czas przygotowania [min]
                        </InputLabel>
                        <Select
                            value={time}
                            onChange={changeTime}
                            input={
                                <OutlinedInput
                                    labelWidth={labelWidth}
                                    id="time"
                                />
                            }
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
                        />
                        <Fab
                            color="secondary"
                            aria-label="Add"
                            className={classes.fab}
                            size="medium"
                            onClick={addIngredient}
                        >
                            <AddIcon />
                        </Fab>
                    </Box>
                    <Box className={classes.ingredientsList}>
                        {ingredients.map(ingredient => (
                            <Chip
                                key={ingredient}
                                label={ingredient}
                                onDelete={handleDelete(ingredient)}
                                className={classes.ingredient}
                            />
                        ))}
                    </Box>
                </Paper>
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                    onClick={addRecipe}
                    disabled={loading}
                >
                    Dodaj
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </Button>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                className={classes[snackbarType]}
                open={snackbarStatus}
                autoHideDuration={3000}
                onClose={() => setSnackbarStatus(false)}
            >
                <SnackbarContent
                    message={
                        snackbarType === "success" ? (
                            <span>Dodano przepis</span>
                        ) : (
                            <span>Wystąpił błąd</span>
                        )
                    }
                    className={classes[snackbarType]}
                    onClose={() => setSnackbarStatus(false)}
                />
            </Snackbar>
        </>
    );
};

export default AddScreen;
