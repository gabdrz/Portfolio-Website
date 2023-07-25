import "../../styles/Projects.css";
import "../../styles/general.css";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import barfee from "../../assets/barfee.png";
import parallax from "../../assets/parallax.png";
import { animated, useSpring } from "react-spring";
import path from "./path.js";
import path2 from "./path2.js";

const Projects = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    let requestId;
    const loop = () => {
      handleScroll();
      requestId = window.requestAnimationFrame(loop);
    };
    loop();
    return () => window.cancelAnimationFrame(requestId);
  }, []);

  const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
    springscrollY: 0,
  }));

  springsetScrollY({ springscrollY: scrollY });

  const interpHeader =
    window.innerWidth > 734
      ? springscrollY.to((o) => `translateY(${o / 1 - 5550}px)`)
      : springscrollY.to((o) => `translateY(${o / 1 - 5550}px)`);

  useEffect(() => {
    if (inView) {
      setActiveSection("projects");
    }
  }, [inView, setActiveSection]);

  const projects = [
    {
      title: "Personal Portfolio Website",
      description:
        "A responsive react website that showcases my skillset and experience; dealt with framer motion for animations.",
    },
    {
      title: "Nurse Station Dashboard App",
      description:
        "An on-going iPad app built using Flutter, that reads and writes data on a Google Sheet; more features will be listed as developent progresses.",
    },
    {
      title: "Automated Freedom Board",
      description:
        "A Python algorithm employing Google API, OS Win32 COM module, and Instagrapi, which facilitates the data scraping process from a Google Sheet, utilizes a Photoshop layout for formatting the data, and automates the posting of the formatted content on an Instagram account.",
    },
  ];

  return (
    <div id="projects" className="page" ref={ref}>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project" key={index}>
            <div className="project-line"></div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="project-img-container">
        <img src={barfee} alt="Project Display" className="project-img" />
        <svg
          className="outline"
          id="Layer_2"
          viewBox="0 0 2167.78 2768.4"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <style>
              {
                ".cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:3px;}"
              }
            </style>
            <clipPath id="clip">
              <path className="cls-1" d={path} id="clip-path" />
            </clipPath>
            <pattern
              id="imgPattern"
              patternUnits="userSpaceOnUse"
              width="2367.78"
              height="2000"
            >
              <image href={parallax} x="100" y="0" width="2160" height="7513" />
            </pattern>
          </defs>
          <g style={{ clipPath: "url(#clip)" }}>
            <animated.rect
              style={{ transform: interpHeader }}
              width="100%"
              height="300%"
              fill="url(#imgPattern)"
            />
          </g>
          <path
            className="cls-1"
            d={path2}
          />
        </svg>
      </div>
    </div>
  );
};

export default Projects;
