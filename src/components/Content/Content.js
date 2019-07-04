import React, { useState } from "react";
import AddScreen from "./AddScreen/AddScreen";
import BrowseScreen from "./BrowseScreen/BrowseScreen";
import RandomScreen from "./RandomScreen/RandomScreen";
import TabContainer from "./TabContainer";
import firebase from "../../firebaseConfig";

const Content = props => {
    const [recipes, setRecipes] = useState({});

    const getRecipes = async () => {
        const db = firebase.firestore();
        const recipes = [];
        await db
            .collection("recipes")
            .get()
            .then(querySnapshot =>
                querySnapshot.forEach(el => {
                    recipes.push({ id: el.id, data: el.data() });
                })
            )
            .then(() => setRecipes(recipes));
    };

    return (
        <>
            {props.value === 0 && (
                <TabContainer>
                    <AddScreen />
                </TabContainer>
            )}
            {props.value === 1 && (
                <TabContainer>
                    <RandomScreen recipes={recipes} getRecipes={getRecipes} />
                </TabContainer>
            )}
            {props.value === 2 && (
                <TabContainer>
                    <BrowseScreen recipes={recipes} getRecipes={getRecipes} />
                </TabContainer>
            )}
        </>
    );
};

export default Content;
