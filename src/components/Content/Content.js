import React from "react";
import SwipeableViews from "react-swipeable-views";
import AddScreen from "./AddScreen/AddScreen";
import BrowseScreen from "./BrowseScreen/BrowseScreen";
import TabContainer from "./TabContainer";

const Content = props => {
    return (
        <SwipeableViews
            axis={"x"}
            index={props.value}
            onChangeIndex={props.handleChangeIndex}
        >
            <TabContainer>
                <AddScreen />
            </TabContainer>
            <TabContainer>Test2</TabContainer>
            <TabContainer>
                <BrowseScreen />
            </TabContainer>
        </SwipeableViews>
    );
};

export default Content;
