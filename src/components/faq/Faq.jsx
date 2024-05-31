import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Typography, Box } from "@mui/material";

import { faqData } from "../data/Data";
import "../../App.css";

const Faq = () => {
  return (
    <Container maxWidth={"false"}>
      <Box sx={{ padding: "85px" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "650",
            marginBottom: "20px",
            marginLeft: "12px",
            fontSize: "2.5vw",
            lineHeight: "1.50rem",
            textShadow: "-1px 1px 10px rgba(0, 0, 0, 0.75)",
          }}
        >
          FAQ
        </Typography>
        {faqData.map((faq) => (
          <Accordion
            sx={{ boxShadow: "none", marginBottom: "19px", fontSize: "1.3vw" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ fontSize: "1.3vw", boxShadow: "none" }}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1vw",
                backgroundColor: "#EEEEEE",
                borderRadius: "20px",
                padding: "20px",
                minHeight: "20vh",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};
export default Faq;
