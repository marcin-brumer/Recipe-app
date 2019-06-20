import React from "react";
import AddScreen from "./AddScreen/AddScreen";
import BrowseScreen from "./BrowseScreen/BrowseScreen";
import TabContainer from "./TabContainer";

const Content = props => {
    return (
        <>
            {props.value === 0 && (
                <TabContainer>
                    <AddScreen />
                </TabContainer>
            )}
            {props.value === 1 && <TabContainer>Test2</TabContainer>}
            {props.value === 2 && (
                <TabContainer>
                    <BrowseScreen />
                </TabContainer>
            )}
        </>
    );
};

export default Content;
