import "../../styles/Skills.css";
import "../../styles/general.css";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  useScroll,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { random, clamp } from "lodash";
import { bubbleData } from "./BubbleData";
import path from "./path.js";

const Skills = ({ setActiveSection }) => {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const bubbleControls = useAnimation();
  const bubbleContainerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const [activeBubble, setActiveBubble] = useState(0);

  const [hasBlown, setHasBlown] = useState(false);

  const [bubblePositions, setBubblePositions] = useState([]);

  const getRandomNonZero = (min, max) => {
    let num;
    do {
      num = random(min, max, true);
    } while (num === 0);
    return num;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = scrollYProgress.get();
      if (currentScrollY >= 0.48 && !hasBlown) {
        setHasBlown(true);
        bubbleControls.start((index) => {
          const containerWidth = bubbleContainerRef.current.offsetWidth;
          const containerHeight = bubbleContainerRef.current.offsetHeight;
          const x = clamp((index % 4) * (containerWidth / 4), 0, containerWidth);
          const y = clamp(Math.floor(index / 4) * (containerHeight / 4), 0, containerHeight);
          setBubblePositions((prevPositions) => [...prevPositions, y]);
          return {
            x: [ -containerWidth * 0.2, x],
            y: [(containerHeight / 2) + 100, y],
            opacity: 1,
            transition: { 
              x: { duration: 2 }, 
              y: { duration: 2, end: y }, 
              opacity: { 
                duration: 2,
                onComplete: () => {
                  bubbleControls.start((i) => {
                    let yValue = getRandomNonZero(-15, 15);
                    let durationValue = getRandomNonZero(2, 3);

                    let initialY = bubblePositions[i];
                    return {
                      y: [
                        `${initialY}px`,
                        `${initialY + yValue}px`,
                        `${initialY - yValue}px`,
                      ],
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: durationValue,
                          ease: "easeInOut",
                          repeatType: "reverse",
                        },
                      },
                    };
                  });
                },
              },
            },
          };
        });
      } else if (currentScrollY <= 0.45 && hasBlown) {
        setHasBlown(false);
        resetText();
        bubbleControls.start({ opacity: 0, transition: { duration: 1 } });
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScroll);

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, bubbleControls, hasBlown, bubblePositions]);
  
  // const pathVariants = {
  //   hidden: {
  //     opacity: 0,
  //     pathLength: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //     pathLength: 1,
  //     transition: {
  //       duration: 2,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  const homepage_logo_main_content = useRef(null);

  const [selectedBubble, setSelectedBubble] = useState(null);

  const handleBubbleClick = (bubbleId) => {
    setActiveBubble(bubbleId);
    setSelectedBubble(bubbleId);
  };

  const resetText = () => {
    setActiveBubble(0);
    setSelectedBubble(null);
  };

  useEffect(() => {
    if (inView) {
      setActiveSection("skills");
    }
    // Add any dependencies if required
  }, [inView, setActiveSection]);

  return (
    <div id="skills" className="page" ref={ref}>
      <div className="line-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1292.08 1013.14"
          onClick={resetText}
        >
          <path
            ref={homepage_logo_main_content}
            d={path}
            // variants={pathVariants}
            initial="hidden"
            style={{
              fill: "none",
              stroke: "#fff",
              strokeMiterlimit: 10,
              strokeWidth: 4,
            }}
          />
        </svg>
      </div>
      <div className="bubbles-and-text-container">
        <div className="bubbles-container" ref={bubbleContainerRef}>
          {bubbleData.map((bubble, index) => (
            <motion.div
              className="bubble-wrapper"
              key={bubble.id}
              custom={index}
              animate={bubbleControls}
              initial={{ x: 0, y: 0, opacity: 0 }}
              onClick={() => handleBubbleClick(bubble.group)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{ position: "absolute" }}
            >
              <motion.img
                style={{ position: "absolute" }}
                src={bubble.image2}
                alt="Bubble"
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedBubble === bubble.group ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img
                src={bubble.image}
                alt="Bubble"
                initial={{ opacity: 1 }}
                animate={{ opacity: selectedBubble === bubble.group ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-container">
          <h1>{bubbleData.find((b) => b.group === activeBubble)?.header}</h1>
          <p>{bubbleData.find((b) => b.group === activeBubble)?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
