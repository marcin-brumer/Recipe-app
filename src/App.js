import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./components/NavBar";
import Content from "./components/Content/Content";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: { main: "#8BC34A" },
        secondary: { main: "#A2D46A" },
        accent: "#FF8A65",
        contrastThreshold: 1
    }
});

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('test');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar handleChange={handleChange} value={value} />
            <Content value={value} />
        </ThemeProvider>
    );
}

export default App;
