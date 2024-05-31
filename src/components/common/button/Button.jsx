import { Box, Button } from "@mui/material";

export default function ButtonComp(props) {
  return (
    <Box
      sx={{
        background: "rgba(6,55,158,1)",
        height: "40px",
        width: props.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
      }}
    >
      <Button
        sx={{
          color: "white",
          fontWeight: "500",
          fontSize: "1rem",
          lineHeight: "1.5rem",
        }}
      >
        {props.title}
      </Button>
    </Box>
  );
}
