import { Box, Container, Grid, Typography, useTheme } from "@mui/material";

import styles from './Apply.module.css';
import ButtonComp from "../common/button/Button";
import { tokens } from "../../theme";

export default function Apply() {
  const theme = useTheme();
  const colors = tokens(theme);

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "",
        marginTop: "40px",
        width: '100%',
        background: '#e7eef8',
        padding: '73px 100px 30px 100px !important'
      }}
    >
      <Container
        maxWidth="false"
        sx={{
          height: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 !important"
        }}
      >
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>

          <Grid item xs={12}>
            <Typography
              sx={{
                color: colors.textBlack,
                justifyContent: "center",
                display: "flex",
                marginTop: "0px",
                variant: "h4",
                lineHeight: "2rem",
                fontSize: "1.5rem",
                fontWeight: "600",
                zIndex: "1",
                marginBottom: '10px'
              }}
            >
              Apply now in 4 easy steps
            </Typography>
            <Typography
              sx={{
                color: colors.textBlack,
                display: "flex",
                justifyContent: "center",
                textAlign: "center", // Align the text to the center
                marginTop: "30px",
                lineHeight: "1.6rem",
                fontSize: ".8rem",
                fontWeight: "400",
                zIndex: "1",
                marginBottom: '40px',
                maxWidth: "1100px", // Limit the width to ensure the text wraps in 3-4 lines
                margin: "0 auto" // Center the text block horizontally
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "50%",
              }}
            >
              <img src="./new/apply-now.jpeg" style={{ width: '100%', height: '61vh' }} />
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={3}>

              <Grid item xs={6}>
                <Box className={styles.ripplebutton}
                  sx={{
                    width: "100%", minHeight: '200px',
                    height: "100%",
                    maxWidth: "100% !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                    borderRadius: "5px",
                    position: 'relative',
                    padding: '20px',
                    textAlign: 'center',
                    // backgroundImage: 'url(../new/wave3.jpg)',
                    // backgroundPosition: 'left',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: '100% 100%',
                    boxShadow: '0px 0px 10px 0px #80808061',
                    ":hover": {
                      transform: "scale(1.02)",
                      background: "",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '-4px',
                    backgroundImage: 'url(../new/tags.png)',
                    height: '62px',
                    width: '85px',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    marginLeft: '-5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>

                    <Typography sx={{ color: "white", }}>1</Typography>
                  </Box>
                  <img
                    style={{
                      width: "70px",
                      height: "auto",
                      objectFit: "fit",
                    }}
                    src={'../new/loan.png'}
                    alt={''}
                  />
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: ".9rem",
                      lineHeight: "1.2rem",
                      fontWeight: "500",
                      marginTop: '15px',
                      width: '50%',

                    }}
                  >
                    Enter your personal, business & bank details to get a fair loan
                    offer
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  className={styles.ripplebutton}
                  sx={{
                    width: "100%", minHeight: '200px',
                    height: "100%",
                    maxWidth: "100% !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                    borderRadius: "5px",
                    position: 'relative',
                    padding: '20px',
                    textAlign: 'center',
                    // backgroundImage: 'url(../new/wave3.jpg)',
                    // backgroundPosition: 'left',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: '100% 100%',
                    boxShadow: '0px 0px 10px 0px #80808061',
                    ":hover": {
                      transform: "scale(1.02)",
                      background: "white",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '-4px',
                    backgroundImage: 'url(../new/tags.png)',
                    height: '62px',
                    width: '85px',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    marginLeft: '-5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>

                    <Typography sx={{ color: "white", }}>2</Typography>
                  </Box>
                  <img
                    style={{
                      width: "70px",
                      height: "auto",
                      objectFit: "fit",
                    }}
                    src={'../new/compare.png'}
                    alt={''}
                  />
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: ".9rem",
                      lineHeight: "1.2rem",
                      fontWeight: "500",
                      marginTop: '15px',
                      width: '50%',
                    }}
                  >
                    Compare the loan offers & choose the best suited option
                  </Typography>
                </Box>
              </Grid>


              <Grid item xs={6}>
                <Box
                  className={styles.ripplebutton}
                  sx={{
                    width: "100%",
                    minHeight: '200px',
                    height: "100%",
                    maxWidth: "100% !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                    borderRadius: "5px",
                    position: 'relative',
                    padding: '20px',
                    textAlign: 'center',
                    // backgroundImage: 'url(../new/wave3.jpg)',
                    // backgroundPosition: 'left',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: '100% 100%',
                    boxShadow: '0px 0px 10px 0px #80808061',
                    ":hover": {
                      transform: "scale(1.02)",
                      background: "white",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '-4px',
                    backgroundImage: 'url(../new/tags.png)',
                    height: '62px',
                    width: '85px',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    marginLeft: '-5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>

                    <Typography sx={{ color: "white", }}>3</Typography>
                  </Box>
                  <img
                    style={{
                      width: "70px",
                      height: "auto",
                      objectFit: "fit",
                    }}
                    src={'../new/verification.png'}
                    alt={''}
                  />
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: ".9rem",
                      lineHeight: "1.2rem",
                      fontWeight: "500",
                      marginTop: '15px',
                      width: '50%',
                    }}
                  >
                    Accept the loan offer & complete your documentation & KYC
                  </Typography>
                </Box>
              </Grid>


              <Grid item xs={6}>

                <Box
                  className={styles.ripplebutton}
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: '200px',
                    maxWidth: "100% !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                    borderRadius: "5px",
                    position: 'relative',
                    padding: '20px',
                    // backgroundImage: 'url(../new/wave3.jpg)',
                    // backgroundPosition: 'left',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: '100% 100%',
                    textAlign: 'center',
                    boxShadow: '0px 0px 10px 0px #80808061',
                    ":hover": {
                      transform: "scale(1.02)",
                      background: "white",
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '-4px',
                    backgroundImage: 'url(../new/tags.png)',
                    height: '62px',
                    width: '85px',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    marginLeft: '-5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>

                    <Typography sx={{ color: "white", }}>4</Typography>
                  </Box>
                  <img
                    style={{
                      width: "70px",
                      height: "auto",
                      objectFit: "fit",
                    }}
                    src={'../new/repayment.png'}
                    alt={''}
                  />
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      fontSize: ".9rem",
                      lineHeight: "1.2rem",
                      fontWeight: "500",
                      marginTop: '15px',
                      width: '50%',
                    }}
                  >
                    Choose from flexible repayment options and start receiving funds
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{
        width: '15%',
        margin: '40px auto 0 auto'
      }}>
        <ButtonComp />
      </Box>
    </Container>
  );
}
