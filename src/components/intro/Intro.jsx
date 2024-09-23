import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from 'react';
import ButtonComp from "../common/button/Button";
import styles from './Intro.module.css';
export default function Intro({ title, home, homeimg, interestRate, text }) {
  console.log("homeimage", homeimg);
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

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
      { threshold: 0.2 } // Trigger when 10% of the element is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        padding: "0px !important",
        maxWidth: "100% !important",
        // height: "150vh !important",
        overflow: "hidden",
        position:'relative',
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

      <Box sx={{  display: "flex",
          flexDirection: "",
          justifyContent: "center",
          alignItems: "flex-start",
          position:'absolute',
          // background: 'linear-gradient(#0b449e8c, #22bdc2a1)',
          left:'100px',
          right:'auto',
          top:'50px',
          bottom:'50px',
          zIndex:'11',
          padding:'20px',
          marginTop:'10vh'
          }}>

      <Box
        sx={{
        
        
          // border: "2px solid yellow",
        }}
      >
        
      
        <Typography
          sx={{
            // marginTop: "5vh",
          fontSize:'4rem',
            fontWeight: "700",
            color:'white',
          }}
          ref={textRef}
          className={`${styles.text} ${isVisible ? styles.visible : ''}`} >
          {title}
        </Typography>
        <Box
          sx={{
            // marginTop: "5vh",
            // height: "30vh",
            // border: "2px solid red",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              textShadow: "1px 1px 2px gray",
              borderRadius: "5px",
              color:'white',
              marginTop:'10px'
            }}
            ref={textRef}
            className={`${styles.text} ${isVisible ? styles.visible : ''}`} >
            {text?.description}
          </Typography>
         
        </Box>

        {home && (
          <Box
            sx={{
              // height: "80vh",
              // marginTop: "5vh",
            }}
          >
            <Typography  className={`${styles.text} ${isVisible ? styles.visible : ''}`}
              sx={{
                fontWeight: "400",
                fontSize: "1rem",
                color:'white',
                textShadow: "1px 1px 2px gray",
                marginTop:'10px'
              }}
            >
              {text?.short_description}
            </Typography>
          
            <Typography  className={`${styles.text} ${isVisible ? styles.visible : ''}`}
              sx={{
                fontSize: "1rem",
                textShadow: "1px 1px 2px gray",
                borderRadius: "5px",
                color:'white',
                marginTop:'10px',
                marginBottom:'40px'
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
                fontSize: "3vw",
                fontWeight: "700",color:'white',
                textShadow: "1px 1px 2px gray",
                marginBottom: "5px",
                // background: 'linear-gradient(#0a3c9a, #22bdc17a)',
                background:'#21bdc1',
                textAlign:'center'
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
          position:'relative'
          // border: "2px solid",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fit",
            // borderTopLeftRadius: "50px",
            // borderBottomRightRadius: "50px",
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
            // marginRight: "10px",
            height: "",
            width: "100%",
            left:0,
            right:0,
            bottom:0,
            position:'absolute'
            
            // border: "2px solid",
          }}>

            {/* <Box 
            sx={{
              width: '20%',
            height: 0,
          
            borderBottom: '100px solid #007bff',
            }}>
              <Typography style={{color:'white'}}>Lorem Ipsum 1</Typography>
              <Typography >Lorem Ipsum 2</Typography>
            </Box> */}
          </Box>

      </Box>
    </Container>
  );
}
