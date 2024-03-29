import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx";
import LoginPage from "scenes/loginPage/index.jsx";
import ProfilePage from "scenes/profilePage/index.jsx";
import {useMemo} from "react"
import {useSelector} from "react-redux"
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles"
import { themeSetting } from "theme.js";

function App() {
  const mode = useSelector((state) => state.mode);
  // Use selector is used to get the stat variable values
  const theme = useMemo(() => createTheme(themeSetting(mode)),[mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  

  return (
    <Router>
    <ThemeProvider theme={theme}>
    <CssBaseline /> 
    {/* This resets the css for material ui */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={isAuth ? <HomePage />: <Navigate to='/' />} />
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage />: <Navigate to='/' />} />
      </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
