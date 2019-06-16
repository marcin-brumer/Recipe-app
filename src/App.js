import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBar from "./components/NavBar";
import AddScreen from "./components/AddScreen";
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
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth="sm" style={{ paddingTop: "16px" }}>
                <AddScreen />
            </Container>
        </ThemeProvider>
    );
}

export default App;
