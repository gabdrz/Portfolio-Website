import { useEffect } from "react";
import { useAnimation, cubicBezier, useScroll } from "framer-motion";
import { random } from "lodash";

export const useBubbleAnimation = (bubbleData, getBubblePositions) => {
  const bubbleControls = useAnimation();
  const { scrollYProgress } = useScroll();
  const ease = cubicBezier(0.1, 0.1, 0.1, 0);

  const getRandomNonZero = (min, max) => {
    let num;
    do {
      num = random(min, max, true);
    } while (num === 0);
    return num;
  };

  const getRandomRotValues = (length) => {
    let values = [];
    for (let i = 0; i < length; i++) {
      values.push(getRandomNonZero(-5, 5));
    }
    return values;
  };

  useEffect(() => {
    let isCancelled = false;

    const animateBubbles = async () => {
      if (!isCancelled) {
        const bubblePositions = getBubblePositions(bubbleData.length);
        const newRotationValues = getRandomRotValues(bubbleData.length);

        await bubbleControls.start((i) => {
          return {
            x: ["0%", `${bubblePositions[i].x}%`],
            y: ["0%", `${bubblePositions[i].y}%`],
            rotate: ["0deg", `${newRotationValues[i]}deg`],
            opacity: [0, 1, 1],
            transition: {
              x: {
                type: "keyframes",
                times: [0, 0.3, 1],
                ease: "easeInOut",
                duration: 4,
              },
              y: {
                type: "keyframes",
                times: [0, 0.6, 1],
                ease: ease,
                duration: 4,
              },
              rotate: {
                duration: 4,
              },
              opacity: {
                duration: 4,
                onComplete: () => {
                  bubbleControls.start((i) => {
                    let yValue = getRandomNonZero(-15, 15);
                    let durationValue = getRandomNonZero(2, 3);

                    let initialY = `${bubblePositions[i].y}%`;
                    let initialRotation = `${newRotationValues[i]}deg`;

                    return {
                      y: [
                        initialY,
                        `${parseFloat(initialY) + yValue}%`,
                        `${parseFloat(initialY) - yValue}%`,
                      ],
                      rotate: [
                        initialRotation,
                        `${parseFloat(initialRotation) + 5}deg`,
                        `${parseFloat(initialRotation) - 5}deg`,
                      ],
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: durationValue,
                          ease: "easeInOut",
                          repeatType: "reverse",
                        },
                        rotate: {
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
      }
    };

    let wasAboveThreshold = false;

    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value >= 0.48 && !wasAboveThreshold) {
        animateBubbles();
        wasAboveThreshold = true;
      } else if (value <= 0.45 && wasAboveThreshold) {
        wasAboveThreshold = false;
        bubbleControls.start({
          opacity: [1, 0],
          transition: {
            opacity: {
              duration: 0.5,
              onComplete: () => bubbleControls.stop(), // stop the animation after opacity transition is done
            },
          },
        });
      }
    });

    return () => {
      isCancelled = true;
      bubbleControls.stop();
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubbleControls, scrollYProgress]);

  return { bubbleControls };
};
