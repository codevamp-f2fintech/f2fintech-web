import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from 'react';

import ButtonComp from "../common/button/Button";
import styles from './Intro.module.css';

export default function Intro({ title, home, homeimg, interestRate, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);
  const descriptionRef = useRef(null);
  const shortDescriptionRef = useRef(null);
  const longDescriptionRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver to trigger animation every time text enters the view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Show animation when in view
          } else {
            setIsVisible(false); // Reset animation when out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 20% of the element is visible
    );

    // Observe each text element
    if (textRef.current) observer.observe(textRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    if (shortDescriptionRef.current) observer.observe(shortDescriptionRef.current);
    if (longDescriptionRef.current) observer.observe(longDescriptionRef.current);

    // Cleanup observer on unmount
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
      if (shortDescriptionRef.current) observer.unobserve(shortDescriptionRef.current);
      if (longDescriptionRef.current) observer.unobserve(longDescriptionRef.current);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        padding: "0px !important", // Increase padding
        maxWidth: "100% !important",
        // height: "100vh", // Adjust this height as needed
        overflow: "hidden",
        position: 'relative',
      }}
    >
      {/* <Box sx={{}}>
      <img
          style={{
            width: "auto",
            height: "auto",
            objectFit: "fit",
          }}
          src={'../new/strip.png'}
          alt={''}
        />

      </Box> */}

      <Box sx={{
        display: "flex",
        alignItems: "flex-start",
        position: 'absolute',
        left: '60px',
        right: 'auto',
        top: '80px',
        bottom: '50px',
        zIndex: '11',
        padding: '15px'
      }}>

        <Box
          sx={{
            width: '40%'
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '6vw', sm: '5vw', md: '4vw', lg: '3vw' }, // Responsive font size
              fontWeight: "700",
              color: 'white',
              // textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            ref={textRef}
            className={`${styles.text} ${isVisible ? styles.visible : ''}`} >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: text?.description.length > 100 ? '0.9rem' : '1.1rem',
              width: '80%',
              textShadow: "1px 1px 2px gray",
              borderRadius: "5px",
              color: 'white',
              marginTop: '30px',
              marginBottom: '30px',
              whiteSpace: 'normal', // Allow line breaks
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            ref={descriptionRef}
            className={`${styles.text} ${isVisible ? styles.visible : ''}`} >
            {text?.description}
          </Typography>


          {home && (
            <Box
              sx={{
                // height: "80vh",
                // marginTop: "5vh",
              }}
            >
              <Typography className={`${styles.text} ${isVisible ? styles.visible : ''}`}
                ref={shortDescriptionRef}
                sx={{
                  fontSize: text?.short_description.length > 60 ? '0.8rem' : '1rem',
                  width: '60%',
                  fontWeight: "400",
                  color: 'white',
                  textShadow: "1px 1px 2px gray",
                  whiteSpace: 'normal',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: '20px 0',
                }}
              >
                {text?.short_description}
              </Typography>

              <Typography className={`${styles.text} ${isVisible ? styles.visible : ''}`}
                ref={longDescriptionRef}
                sx={{
                  fontSize: text?.long_description.length > 200 ? '0.8rem' : '1rem',
                  textShadow: "1px 1px 2px gray",
                  borderRadius: "5px",
                  color: 'white',
                  marginTop: '30px',
                  marginBottom: '40px',
                  whiteSpace: 'normal', // Allow wrapping
                  width: '80%',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 5, // Number of lines to show (adjust as needed)
                }}
              >
                {text?.long_description}
              </Typography>
            </Box>
          )}
          <ButtonComp title="Calculate Returns" width="190px" />
        </Box>

        <Box className={styles.interestrateBox} >
          <Typography
            sx={{
              color: "rgba(6,55,158,1)",
              fontSize: "14px",
              fontWeight: "700",
              textShadow: "1px 1px 2px gray",
              marginBottom: "3px",
              paddingTop: '3px',
              paddingBottom: '3px',
              background: '#21bdc1',
              textAlign: 'center',
            }}
          >
            Starting From
          </Typography>
          <Typography
            sx={{
              color: "rgba(6,55,158,1)",
              fontSize: "2.8vw",
              fontWeight: "700",
              textShadow: "1px 1px 2px gray",
              marginBottom: "5px",
              // background: 'linear-gradient(#0a3c9a, #22bdc17a)',
              background: '#21bdc1',
              textAlign: 'center',
            }}
          >
            {interestRate}
          </Typography>
          <img
            style={{
              width: "150px",
              height: "auto",
              objectFit: "fit",
            }}
            src={'../new/anim2.gif'}
            alt={''}
          />
        </Box>

      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "",
          alignItems: "center",
          // marginTop: "20vh",
          // marginRight: "10px",
          height: "90vh",
          width: "100%",
          position: 'relative'
          // border: "2px solid",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fit"
          }}
          src={homeimg}
          alt={title}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "",
            alignItems: "center",
            marginTop: "",
            height: "",
            width: "100%",
            left: 0,
            right: 0,
            bottom: 0,
            position: 'absolute'
          }}>
        </Box>

      </Box>
    </Container>
  );
}
