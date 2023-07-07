import "../../styles/general.css";
import "../../styles/Contact.css";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { random } from "lodash";
import third from "../../assets/three.png";
import body from "../../assets/body.png";
import helmet from "../../assets/helmet.png";
import email from "../../assets/icons/email_white.png";
import email2 from "../../assets/icons/email_black.png";
import linkedin from "../../assets/icons/linkedin_white.png";
import linkedin2 from "../../assets/icons/linkedin_black.png";
import github from "../../assets/icons/github_white.png";
import github2 from "../../assets/icons/github_black.png";
import instagram from "../../assets/icons/instagram_white.png";
import instagram2 from "../../assets/icons/instagram_black.png";
import twitter from "../../assets/icons/twitter_white.png";
import twitter2 from "../../assets/icons/twitter_black.png";

const Contact = ({ setActiveSection }) => {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const imageControls = useAnimation();

  // Links and associated icons
  const iconData = [
    {
      link: "mailto:gabrieljohn.drz@gmail.com",
      icon: email,
      icon2: email2,
    },
    {
      link: "https://linkedin.com/in/gabriel-zafra",
      icon: linkedin,
      icon2: linkedin2,
    },
    {
      link: "https://github.com/gabdrz",
      icon: github,
      icon2: github2,
    },
    {
      link: "https://instagram.com/gabrieldrz",
      icon: instagram,
      icon2: instagram2,
    },
    {
      link: "https://twitter.com/gabrieljohndrz",
      icon: twitter,
      icon2: twitter2,
    },
  ];

  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconHover = (index) => {
    setSelectedIcon(index);
  };

  const handleIconHoverLeave = () => {
    setSelectedIcon(null);
  };

  const getRandomNonZero = (min, max) => {
    let num;
    do {
      num = random(min, max, true);
    } while (num === 0);
    return num;
  };

  useEffect(() => {
    const animateImages = async () => {

      imageControls.start((i) => {
        let yValue = getRandomNonZero(-3, 3);
        let durationValue = getRandomNonZero(2, 3);

        let initialY = `0%`;

        if (i === 1) {
          yValue *= 2; // Double the distance for the helmet.
        }

        return {
          y: [
            initialY,
            `${parseFloat(initialY) + yValue}%`,
            `${parseFloat(initialY) - yValue}%`,
          ],
          scale: 0.3, // Apply the scale here.
          transition: {
            y: {
              repeat: Infinity,
              duration: durationValue,
              ease: "easeInOut",
              repeatType: "reverse",
            },
            scale: { duration: 0 }, // Immediate scaling.
          },
        };
      });
    };

    if (inView) {
      animateImages();
      setActiveSection("contact");
    } else if (!inView) {
      imageControls.stop();
    }

    return () => {
      imageControls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageControls, inView, setActiveSection]);

  return (
    <div id="contact" className="page" ref={ref}>
      <img src={third} alt="Fourth" className="image-middle" />
      <div className="image-container">
        {[body, helmet].map((imageSrc, i) => (
          <motion.img
            key={i}
            className={`image-${i === 0 ? "body" : "helmet"}`}
            src={imageSrc}
            alt={i === 0 ? "Body" : "Helmet"}
            custom={i}
            animate={imageControls}
            initial={{ y: 0 }}
          />
        ))}
      </div>

      <div className="contact-links">
        {iconData.map((icon, index) => (
          <a
            key={index}
            href={icon.link}
            onMouseEnter={() => handleIconHover(index)}
            onMouseLeave={handleIconHoverLeave}
          >
            <motion.img
              style={{ position: "absolute" }}
              src={icon.icon2}
              alt="Icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedIcon === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src={icon.icon}
              alt="Icon"
              initial={{ opacity: 1 }}
              animate={{ opacity: selectedIcon === index ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
