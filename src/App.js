import { ThemeProvider } from "styled-components"
import { useState } from "react"
import { darkTheme, lightTheme } from "./utils/Themes.js"
import Navbar from "./components/Navbar/index.js"
import "./App.css"
import { BrowserRouter as Router } from "react-router-dom"
import HeroSection from "./components/HeroSection/index.js"
import About from "./components/About/index.js"
import Skills from "./components/Skills/index.js"
import Projects from "./components/Projects/index.js"
import Contact from "./components/Contact/index.js"
import Footer from "./components/Footer/index.js"
import Experience from "./components/Experience/index.js"
import Education from "./components/Education/index.js"
import ProjectDetails from "./components/ProjectDetails/index.jsx"
import styled from "styled-components"
import { Snackbar, Alert } from "@mui/material"

const Body = styled.div`
    background-color: ${({ theme }) => theme.bg};
    width: 100%;
    overflow-x: hidden;
`

const Wrapper = styled.div`
    background: linear-gradient(
            38.73deg,
            rgba(204, 0, 187, 0.15) 0%,
            rgba(201, 32, 184, 0) 50%
        ),
        linear-gradient(
            141.27deg,
            rgba(0, 70, 209, 0) 50%,
            rgba(0, 70, 209, 0.15) 100%
        );
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`

function App() {
    const [darkMode, setDarkMode] = useState(true)
    const [openModal, setOpenModal] = useState({ state: false, project: null })
    const [open, setOpen] = useState(false) // Added for Snackbar
    const [alert, setAlert] = useState({ message: "", severity: "success" }) // Added for Snackbar

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Router>
                <Navbar />
                <Body>
                    <HeroSection />
                    <Wrapper>
                        <Skills />
                        <Experience />
                    </Wrapper>
                    <Projects
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                    <Wrapper>
                        <Education />
                        <Contact setOpen={setOpen} setAlert={setAlert} />{" "}
                        {/* Pass props */}
                    </Wrapper>
                    <Footer />
                    {openModal.state && (
                        <ProjectDetails
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                        />
                    )}
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={() => setOpen(false)}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        sx={{ zIndex: 1500 }} // Increased to 1500
                    >
                        <Alert
                            onClose={() => setOpen(false)}
                            severity={alert.severity}
                            sx={{ width: "100%" }}
                        >
                            {alert.message}
                        </Alert>
                    </Snackbar>
                </Body>
            </Router>
        </ThemeProvider>
    )
}

export default App
