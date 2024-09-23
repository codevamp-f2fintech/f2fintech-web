
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import styles from './Advantages.module.css';
import React, { useState , useEffect, useRef,} from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Advantages({ advantagesData }) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef1 = useRef(null);

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

    if (textRef1.current) {
      observer.observe(textRef1.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (textRef1.current) {
        observer.unobserve(textRef1.current);
      }
    };
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        sx={{
          background:
           'black',
          height: "70vh",
          maxWidth: "100% !important",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{}}>
            <Typography
             ref={textRef1}
            //  className={`${styles.titlehere} ${isVisible ? styles.visible1 : ''}`} 
              variant="h3"
              sx={{
                color: "white",
                lineHeight: "4rem",
                fontSize: "3vw",
                fontWeight: "550",
                textShadow: "-1px 1px 10px rgba(0, 0, 0, 0.75)",
              }}
            >
              Why f2fintech?
            </Typography>
          </Box>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {advantagesData.map((advantage) => (
              <Grid item xs={4}>
                <Item
                  sx={{
                    backgroundColor: "transparent",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    boxShadow: "none",
                    border: '15px solid #d7f6ff',
                    padding: '30px',
                    borderRadius: '10px',
                    background: '#003b6f',
                     flexDirection:'column',
                     height:'200px',
                    color: 'black',
                    ":hover": {
                      transform: "scale(1.05)",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection:'column'
                   
                    
                    }}
                  >
                    {advantage.logo}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        fontSize: "1.3vw",
                        lineHeight: "2rem",
                        color: "white",
                        fontWeight: "600",
                        marginTop: "20px",
                        fontFamily: "cursive",
                        textAlign:'center',
                      }}
                    >
                      {advantage.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: ".80rem",
                        lineHeight: "1rem",
                        color: "white",
                        fontWeight: "300",
                      }}
                    >
                      {advantage.subtitle}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

// PropTypes definition for Advantages component
Advantages.propTypes = {
  advantagesData: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
    })
  ).isRequired,
};
