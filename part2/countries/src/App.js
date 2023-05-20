import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";

import SearchBar from "./components/SearchBar";
import CountriesBlock from "./components/CountriesBlock";
import Footer from "./components/Footer";
import { getAll } from "./services/apiRequests";

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, switchMode] = useState("dark");
  const [weather, setWeather] = useState({});

  const theme = createTheme({
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    palette: {
      primary: {
        main: "#009900",
      },
      secondary: {
        main: "#388e3c",
      },
      mode: mode,
    },
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const toggle = () => {
    mode === "dark" ? switchMode("light") : switchMode("dark");
  };

  useEffect(() => {
    getAll().then((res) => {
      setCountries(res);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <img src="http://wallspaper.ru/uploads/gallery/main/25/flags-world1024.jpg" alt="" className="background" /> */}
      <div className="App">
        <SearchBar handleChange={handleChange} toggle={toggle} mode={mode} />
        <CountriesBlock
          search={search.replace(/[^a-z\s]/gi, "")}
          countries={countries}
          weather={weather}
          setWeather={setWeather}
        />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
