import React, { useState, useEffect } from "react";
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
import axios from "../../../axios-recipes";
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

    const updateRecipes = async () => {
        setLoading(true);
        const response = await axios.get("/recipes.json");
        const recipes = response.data;
        setRecipes(recipes);
        setLoading(false);
    };

    useEffect(() => {
        updateRecipes();
    }, []);

    const classes = useStyles();

    return loading ? (
        <CircularProgress className={classes.progress} />
    ) : (
        <Paper>
            <List>
                {Object.keys(recipes).map(key => {
                    return (
                        <ListItem key={key}>
                            <ListItemAvatar>
                                <Avatar>{getRandomIcon()}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={recipes[key].name}
                                secondary={`Czas - ${recipes[key].time} min`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="Show"
                                    onClick={() => console.log("test1")}
                                >
                                    <SearchIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="Edit"
                                    onClick={() => console.log("test2")}
                                    className={classes.editButton}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="Delete"
                                    onClick={() => console.log("test3")}
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
    );
};

export default BrowseScreen;
