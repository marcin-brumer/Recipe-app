import React, { useState, useEffect } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import PreviewModal from "./PreviewModal";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PizzaIcon from "@material-ui/icons/LocalPizza";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import firebase from "../../../firebaseConfig";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    deleteButton: {
        color: theme.palette.error.dark
    },
    editButton: {
        color: theme.palette.accent
    },
    progress: {
        position: "absolute",
        left: "calc(50vw - 20px)"
    },
    text: {
        maxWidth: "50%",
        wordBreak: "break-word"
    },
    success: {
        backgroundColor: theme.palette.primary.main
    },
    error: {
        backgroundColor: theme.palette.error.dark
    }
}));

const iconsArray = [
    <RestaurantIcon />,
    <RestaurantMenuIcon />,
    <FastfoodIcon />,
    <PizzaIcon />
];

const getRandomIcon = () =>
    iconsArray[Math.floor(Math.random() * iconsArray.length)];

const BrowseScreen = props => {
    const [recipes, setRecipes] = useState({});
    const [loading, setLoading] = useState(true);
    const [editLoader, setEditLoader] = useState(false);
    const [activeRecipeId, setActiveRecipeId] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [activeRecipe, setActiveRecipe] = useState("");
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [snackbarType, setSnackbarType] = useState("success");

    const updateRecipes = () => {
        setLoading(true);
        const db = firebase.firestore();
        const recipes = [];
        db.collection("recipes")
            .get()
            .then(querySnapshot =>
                querySnapshot.forEach(el => {
                    recipes.push({ id: el.id, data: el.data() });
                })
            )
            .then(() => setRecipes(recipes))
            .then(() => setLoading(false));
    };

    useEffect(() => {
        updateRecipes();
    }, []);

    const deleteRecipe = () => {
        const db = firebase.firestore();
        db.collection("recipes")
            .doc(activeRecipeId)
            .delete()
            .then(() => {
                setDeleteModal(false);
                updateRecipes();
            });
    };

    const saveChanges = event => {
        event.preventDefault();
        if (
            activeRecipe.name !== "" &&
            activeRecipe.time !== "" &&
            activeRecipe.ingredients.length > 0
        ) {
            setEditLoader(true);
            const recipe = {
                name: activeRecipe.name,
                time: activeRecipe.time,
                ingredients: activeRecipe.ingredients,
                date: new Date()
            };
            const db = firebase.firestore();
            db.collection("recipes")
                .doc(activeRecipeId)
                .update(recipe)
                .then(res => {
                    setEditLoader(false);
                    setEditModal(false);
                    updateRecipes();
                    setSnackbarType("success");
                    setSnackbarStatus(true);
                })
                .catch(err => {
                    setEditLoader(false);
                    setEditModal(false);
                    updateRecipes();
                    setSnackbarType("error");
                    setSnackbarStatus(true);
                });
        }
    };

    const classes = useStyles();

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <>
            <Paper>
                <List>
                    {recipes.map(recipe => {
                        return (
                            <ListItem key={recipe.id}>
                                <ListItemAvatar>
                                    <Avatar>{getRandomIcon()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={recipe.data.name}
                                    secondary={`Czas - ${recipe.data.time} min`}
                                    className={classes.text}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="Preview"
                                        onClick={() => {
                                            setActiveRecipe(recipe.data);
                                            setPreviewModal(true);
                                        }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="Edit"
                                        onClick={() => {
                                            setActiveRecipeId(recipe.id);
                                            setActiveRecipe(recipe.data);
                                            setEditModal(true);
                                        }}
                                        className={classes.editButton}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="Delete"
                                        onClick={e => {
                                            setActiveRecipeId(recipe.id);
                                            setDeleteModal(true);
                                        }}
                                        className={classes.deleteButton}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
            <DeleteModal
                open={deleteModal}
                handleClose={() => setDeleteModal(false)}
                deleteRecipe={deleteRecipe}
            />
            <EditModal
                open={editModal}
                handleClose={() => setEditModal(false)}
                saveChanges={saveChanges}
                loading={editLoader}
                activeRecipe={activeRecipe}
                setActiveRecipe={setActiveRecipe}
            />
            <PreviewModal
                open={previewModal}
                handleClose={() => setPreviewModal(false)}
                activeRecipe={activeRecipe}
            />
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                className={classes[snackbarType]}
                open={snackbarStatus}
                autoHideDuration={2000}
                onClose={() => setSnackbarStatus(false)}
            >
                <SnackbarContent
                    message={
                        snackbarType === "success" ? (
                            <span>Zapisano zmiany</span>
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

export default BrowseScreen;
