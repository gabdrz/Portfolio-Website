import "../../styles/general.css";
import "../../styles/About.css";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import headshot from "../../assets/headshot.png";
import hero from "../../assets/binoculars.png";
import plane from "../../assets/plane.png";

const calc = (o) => `translate3d(${o * 2}px, -${o * 0.5}px, 0)`;

const scale = (o) => `scale(${1 + o / 100})`;

const About = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const scrollRef = useRef();

  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));

  const onScroll = () => {
    const scrollTop = window.pageYOffset;
    const startThreshold = 0;  // adjust this value to your needs
  
    if (scrollTop > startThreshold) {
      // subtract the threshold so that the offset starts from 0
      set({ offset: scrollTop - startThreshold });
    }
  };
  

  useEffect(() => {
    if (inView) {
      setActiveSection("about");
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, setActiveSection, set]);

  return (
    <div id="about" className="page" ref={ref}>
      <div className="plane" ref={scrollRef}>
        <animated.img
          style={{
            transform: offset.to((o) => `${calc(o)} ${scale(o)}`),
          }}
          src={plane}
          alt="Gabriel"
        />
      </div>
      <div className="about-text-section">
        <h1>Gabriel Zafra</h1>
        <p className="text-1">
          As someone who believes in executing with the best effort, I am a
          recent computer science graduate who loves to solve problems in unique
          and innovative ways. Inspired by my high school programming teacher
          who recognized my out-of-the-box approach, I ventured into software
          and game development to create impactful experiences.
        </p>
        <p className="text-2">
          {" "}
          I take pride in the speed at which I can learn and master new skills;
          it's a trait that has allowed me to quickly adapt and create outputs
          that employers value. Whether it's a programming language, coding
          principle, art style, or even a new game, I enjoy the challenge of
          diving into unfamiliar territory and embracing the opportunity to
          expand my knowledge and expertise.
        </p>
      </div>
      <div className="about-image-section">
        <img className="rounded-image" src={headshot} alt="Gabriel Zafra" />
        <animated.img className="large-image" src={hero} alt="Gabriel Zafra" />
      </div>
    </div>
  );
};

export default About;
