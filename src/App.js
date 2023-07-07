import React, { useState } from "react";
import { Link } from "react-scroll";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import Contact from "./components/contact/Contact";
import logo from "./assets/dog_logo.png";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="home" smooth={true}>
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </li>
          <li>
            <Link
              className={activeSection === "home" ? "active" : ""}
              to="home"
              smooth={true}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={activeSection === "about" ? "active" : ""}
              to="about"
              smooth={true}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={activeSection === "skills" ? "active" : ""}
              to="skills"
              smooth={true}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              className={activeSection === "projects" ? "active" : ""}
              to="projects"
              smooth={true}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              className={activeSection === "contact" ? "active" : ""}
              to="contact"
              smooth={true}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <Home setActiveSection={setActiveSection} />
      <About setActiveSection={setActiveSection} />
      <Skills setActiveSection={setActiveSection} />
      <div className="projects-contact-wrapper">
        <Projects setActiveSection={setActiveSection} />
        <Contact setActiveSection={setActiveSection} />
      </div>
    </div>
  );
}

export default App;
