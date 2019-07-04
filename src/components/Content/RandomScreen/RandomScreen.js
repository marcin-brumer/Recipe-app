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
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";

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
    progress: {
        position: "absolute",
        left: "calc(50vw - 20px)"
    }
}));

const RandomScreen = props => {
    const { recipes, getRecipes } = props;

    const inputLabel = useRef(null);

    const [time, setTime] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [labelWidth, setLabelWidth] = useState(0);
    const [screenState, setScreenState] = useState("ready");

    const updateRecipes = () => {
        setScreenState("loading");
        getRecipes().then(() => setScreenState("ready"));
    };

    useEffect(() => {
        updateRecipes();
        setLabelWidth(inputLabel.current.offsetWidth);
        // eslint-disable-next-line
    }, []);

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

    const getRandomRecipe = event => {
        event.preventDefault();
        if (ingredients === []) {
            const result = recipes.filter(recipe => {
                return recipe.data.time <= time;
            });
        }
        if (time === "") {
            const result = recipes.filter(recipe => {
                return recipe.data.ingredients;
            });
        }
    };

    const classes = useStyles();

    console.log(time);
    const renderScreen = () => {
        switch (screenState) {
            case "loading": {
                return <CircularProgress className={classes.progress} />;
            }
            case "result": {
                return <div />;
            }
            default: {
                return (
                    <form>
                        <Paper className={classes.container}>
                            <FormControl
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                            >
                                <InputLabel ref={inputLabel}>
                                    Max czas przygotowania [min]
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
                                    label="Wymagany składnik"
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
                            onClick={getRandomRecipe}
                        >
                            Losuj
                        </Button>
                    </form>
                );
            }
        }
    };

    return renderScreen();
};

export default RandomScreen;