import React from "react"
import {
    Nav,
    NavLink,
    NavbarContainer,
    Span,
    NavLogo,
    NavItems,
    GitHubButton,
    ButtonContainer,
    MobileIcon,
    MobileMenu,
    MobileLink,
} from "./NavbarStyledComponent"
import { DiCssdeck } from "react-icons/di"
import { FaBars } from "react-icons/fa"
import { Bio } from "../../data/constants"
import { useTheme } from "styled-components"
import logoImage from "../../images/logo.png"
import "../../App.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const theme = useTheme()

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to="/">
                    <a
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        {/* Logo for medium and above */}
                        <img
                            src={logoImage}
                            alt="Brand Logo"
                            style={{
                                display: "none", // Hidden by default
                                width: "200px", // Adjust size as needed
                                height: "200px",
                                marginRight: "10px",
                                marginTop: "50px",
                                objectFit: "contain", // Ensures logo scales nicely
                            }}
                            className="navbar-logo"
                        />
                        {/* Icon and text for below medium */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                            className="navbar-icon-text"
                        >
                            <DiCssdeck size="3rem" />
                            <Span>Jino Devasia</Span>
                        </div>
                    </a>
                </NavLogo>
                <MobileIcon>
                    <FaBars
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                    />
                </MobileIcon>
                <NavItems>
                    <NavLink href="#about">About</NavLink>
                    <NavLink href="#skills">Skills</NavLink>
                    <NavLink href="#experience">Experience</NavLink>
                    <NavLink href="#projects">Projects</NavLink>
                    <NavLink href="#education">Education</NavLink>
                    <NavLink href="#contact">Contact</NavLink>
                </NavItems>
                <ButtonContainer>
                    <GitHubButton href={Bio.github} target="_blank">
                        Github Profile
                    </GitHubButton>
                </ButtonContainer>
                {isOpen && (
                    <MobileMenu isOpen={isOpen}>
                        <MobileLink
                            href="#about"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            About
                        </MobileLink>
                        <MobileLink
                            href="#skills"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            Skills
                        </MobileLink>
                        <MobileLink
                            href="#experience"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            Experience
                        </MobileLink>
                        <MobileLink
                            href="#projects"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            Projects
                        </MobileLink>
                        <MobileLink
                            href="#education"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            Education
                        </MobileLink>
                        <MobileLink
                            href="#contact"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            Contact
                        </MobileLink>
                        <GitHubButton
                            style={{
                                padding: "10px 16px",
                                background: `${theme.primary}`,
                                color: "white",
                                width: "max-content",
                            }}
                            href={Bio.github}
                            target="_blank"
                        >
                            Github Profile
                        </GitHubButton>
                    </MobileMenu>
                )}
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar
