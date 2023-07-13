import "../../styles/Projects.css";
import "../../styles/general.css";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import barfee from "../../assets/barfee.png";
import parallax from "../../assets/parallax.png";
import { animated, useSpring } from "react-spring";

const Projects = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [scrollY, setScrollY] = useState(0);

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  const [{ springscrollY }, springsetScrollY] = useSpring(() => ({
    springscrollY: 0,
  }));

  springsetScrollY({ springscrollY: scrollY });

  const interpHeader = window.innerWidth > 734 ? springscrollY.to((o) => `translateY(${o / 1 - 5550}px)`) : springscrollY.to((o) => `translateY(${o / 1 - 5550}px)`);

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
        "An on-going iPad app for Cedar Sinai built using Flutter, that reads and writes data on a Google Sheet; more features will be listed as developent progresses.",
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
              <path
                className="cls-1"
                d="m2165.78,2766.9H1.78l43.69-254.77c10.45-60.97,31.95-119.52,63.43-172.78l83.76-141.71c26.89-45.49,45.82-95.23,55.99-147.09l22.72-115.86c3.13-15.98,5.56-32.08,7.28-48.28l15.05-141.64c4.35-40.9,16.16-80.66,34.85-117.31l86.76-170.08c9.24-18.12,20.44-35.2,33.61-50.7,29.52-34.72,52.31-74.74,67.12-118l66.49-194.23c22.02-64.34,62.13-120.96,115.52-163.07l147.91-116.67c60.77-47.94,110.1-108.82,144.41-178.21l70.22-142.04c33.83-68.43,92.58-121.32,164.18-147.8l53.61-19.82c63.75-23.58,114.96-72.41,141.52-134.98L1499.28,4.9s2,9,12,10,13-3,24-2,21,14,24,14,7-7,8-5l129.04,199.49c29.29,45.29,44.25,98.36,42.91,152.28l-2.73,110.23c-1.07,43.3,7.82,86.26,26.01,125.57l60.67,131.17c20.54,44.42,32.25,92.41,34.47,141.3l8.06,177.55c2.6,57.38,18.37,113.39,46.09,163.71l75.57,137.18c29.83,54.15,52.78,111.8,68.32,171.64l34.26,110.74c17.34,56.06,21.92,115.3,13.38,173.36l-22.23,151.27c-7.14,48.61-5.27,98.11,5.53,146.04l33.4,148.29c10.83,48.06,17.97,96.88,21.38,146.03l24.88,359.17"
                id="clip-path"
              />
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
            d="m2165.78,2766.9H1.78l43.69-254.77c10.45-60.97,31.95-119.52,63.43-172.78l83.76-141.71c26.89-45.49,45.82-95.23,55.99-147.09l22.72-115.86c3.13-15.98,5.56-32.08,7.28-48.28l15.05-141.64c4.35-40.9,16.16-80.66,34.85-117.31l86.76-170.08c9.24-18.12,20.44-35.2,33.61-50.7,29.52-34.72,52.31-74.74,67.12-118l66.49-194.23c22.02-64.34,62.13-120.96,115.52-163.07l147.91-116.67c60.77-47.94,110.1-108.82,144.41-178.21l70.22-142.04c33.83-68.43,92.58-121.32,164.18-147.8l53.61-19.82c63.75-23.58,114.96-72.41,141.52-134.98L1499.28,4.9s2,9,12,10,13-3,24-2,21,14,24,14,7-7,8-5l129.04,199.49c29.29,45.29,44.25,98.36,42.91,152.28l-2.73,110.23c-1.07,43.3,7.82,86.26,26.01,125.57l60.67,131.17c20.54,44.42,32.25,92.41,34.47,141.3l8.06,177.55c2.6,57.38,18.37,113.39,46.09,163.71l75.57,137.18c29.83,54.15,52.78,111.8,68.32,171.64l34.26,110.74c17.34,56.06,21.92,115.3,13.38,173.36l-22.23,151.27c-7.14,48.61-5.27,98.11,5.53,146.04l33.4,148.29c10.83,48.06,17.97,96.88,21.38,146.03l24.88,359.17"
          />
        </svg>
      </div>
    </div>
  );
};

export default Projects;
