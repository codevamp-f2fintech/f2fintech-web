import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box, Grid } from "@mui/material";

import "../../App.css";
import { faqData } from "../data/Data.jsx";

const Faq = () => {
  return (
    <Container maxWidth={"false"} sx={{ background: '#e7eef8' }}>
      <Box sx={{ padding: "85px" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "650",
            marginBottom: "20px",
            marginLeft: "12px",
            fontSize: "2vw",
            lineHeight: "1.50rem",
            textAlign: 'center'
          }}
        >
          FAQ
        </Typography>

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={5} sx={{ padding: '50px' }}>
            <Box sx={{ display: 'inline-block', paddingLeft: '20px', paddingBottom: '20px', borderRadius: '10px' }}>
              <img
                src='/new/faq.png'
                style={{ height: "auto", width: "100%", marginTop: '-20px', marginRight: '-20px', borderRadius: '10px' }}
              />
            </Box>
          </Grid>
          <Grid xs={7} sx={{ padding: '50px' }}>
            {faqData.map((faq, index) => (
              <Accordion
                key={index}
                sx={{ boxShadow: "none", marginBottom: "10px", fontSize: "1.3vw" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ fontSize: "1rem", boxShadow: "none", background: '#fff' }}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: ".85rem",
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    borderTop: '1px solid #07399f'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Faq;
