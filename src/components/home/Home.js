import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { animated, useSpring } from "@react-spring/web";
import hero from "../../assets/cup_of_tea.png";
import "../../styles/general.css";
import "../../styles/Home.css";

const calc = (o) => `translateX(-${o * 3}px)`;
const scale = (o) => `scale(${1 + o / 1000})`; // adjust scaling factor as needed

const words = ['Web Developer', 'UX Designer', 'AI Enthusiast', 'Freelance Graphic Designer']; 
 
const Home = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const scrollRef = useRef();

  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));

  const onScroll = () => {
    set({ offset: window.pageYOffset });
  };

  const [index, setIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (inView) {
      setActiveSection("home");
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, setActiveSection, set]);

  useEffect(() => {
    let currentText = reverse ? words[index] : '';
    const timer = setInterval(() => {
      if (!reverse && currentText.length === words[index].length) {
        clearInterval(timer);
        setPause(true); 
      } else if (reverse && currentText === '') {
        clearInterval(timer);
        setReverse(false);
        setPause(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else if (!pause) {
        if (reverse) {
          currentText = currentText.substring(0, currentText.length - 1);
        } else {
          currentText = words[index].substring(0, currentText.length + 1);
        }
        setText(currentText);
      }
    }, 100); // Adjust the speed of typing here

    return () => clearInterval(timer);
  }, [index, reverse, pause]);

  useEffect(() => {
    if (pause) {
      const timer = setTimeout(() => {
        setReverse(true);
        setPause(false);
      }, 2000); // Adjust the delay before deleting the phrase here

      return () => clearTimeout(timer);
    }
  }, [pause]);

  return (
    <div id="home" className="page" ref={ref}>
      <div className="text-section">
        <h1>Hi, I'm Gabriel</h1>
        <h2>{text}<span className="cursor"></span></h2>
      </div>
      <div className="image-section" ref={scrollRef}>
        <animated.img
          style={{
            transform: offset.to(o => `${calc(o)} ${scale(o)}`),
            opacity: offset.to((o) => 1 - o / 700),
          }}
          src={hero}
          alt="Gabriel"
        />
      </div>
    </div>
  );
};

export default Home;
