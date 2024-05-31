import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container direction={"column"} sx={{ height: "500px" }}>
        <Grid
          item
          xs={6}
          sx={{ height: "100px", width: "50%", border: "2px solid black" }}
        >
          <Item>1</Item>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ height: "400px", width: "50%", border: "2px solid green" }}
        >
          <Item>2</Item>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ height: "100px", width: "50%", border: "2px solid red" }}
        >
          <Item>3</Item>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ height: "400px", width: "50%", border: "2px solid blue" }}
        >
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
