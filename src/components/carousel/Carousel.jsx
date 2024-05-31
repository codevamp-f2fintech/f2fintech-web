import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Marquee from "react-fast-marquee";
import "./Carousel.css";
function Carousel() {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        height: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Marquee pauseOnHover={"false"} autoFill={"false"} speed={"50"}>
        ;
        <span style={{ fontSize: "1.4vw" }}>
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Hassle-free loans up to 30 lakhs
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          No collateral or guarantee needed
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Minimal Documentation
          <FiberManualRecordIcon
            sx={{
              verticalAlign: "middle",
              margin: "0 10px",
            }}
          />
          Fully online loan application
        </span>
      </Marquee>
    </Box>
  );
}
export default Carousel;
