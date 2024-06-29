import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { MenuItem, Menu, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { pages, products } from "../../data/Data";


export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <Box
      sx={{
        display: "flex",
        zIndex: "100",
        height: "13vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "2%",
            width: "50%",
          }}
        >
          <Toolbar sx={{ display: "flex" }}>
            <Link to={pages[0].href}>
              <img
                src="f2Fintechlogo.png"
                alt="Logo"
                style={{ height: "100px", width: "100px" }}
              />
            </Link>
          </Toolbar>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            color="inherit"
            aria-controls={anchorEl ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            onMouseEnter={handleMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              height: "40px",
              textTransform: "none",
              fontSize: "1rem",
              // border: "0.01em solid rgba(6,55,158,1)",
              borderRadius: "22px",
              marginRight: "10px",
              color: " rgba(6,55,158,1)",
              backgroundColor: "#EEEEEE",
            }}
          >
            Products
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{ onMouseLeave: handleMenuClose }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
          >
            {products.map((product) => (
              <Link
                key={product.title}
                to={product.href}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  handleMenuClose();
                  topFunction();
                }}
              >
                <MenuItem>
                  <Typography>{product.title}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
          {pages.map((page) => (
            <Button
              href={page.href}
              key={page.title}
              color="inherit"
              sx={{
                height: "40px",
                textTransform: "none",
                fontSize: "1rem",
                // border: "0.01em solid silver",
                borderRadius: "22px",
                marginLeft: "10px",
                marginRight: "10px",
                backgroundColor: "#EEEEEE",
              }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
