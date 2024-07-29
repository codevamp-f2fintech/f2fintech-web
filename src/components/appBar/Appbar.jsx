import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { MenuItem, Menu, Typography, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { pages, products } from "../../data/Data";
import { Utility } from "../utility";

export default function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { getLocalStorage, remLocalStorage } = Utility();

  const customer = getLocalStorage("customerInfo");
  const username = customer?.name;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    remLocalStorage("customerInfo");
    handleUserMenuClose();
    navigate("/");
  };
  const handleResetPassword = () => {
    handleUserMenuClose();
    navigate("/reset-password");
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseOut = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", height: "13vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", backgroundColor: "white" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginLeft: "2%", width: "50%" }}>
          <Toolbar sx={{ display: "flex" }}>
            <Link to={pages[0].href}>
              <img src="f2Fintechlogo.png" alt="Logo" style={{ height: "100px", width: "100px" }} />
            </Link>
          </Toolbar>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "2%",
          }}
        >
          <Button
            color="inherit"
            aria-controls={anchorEl ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{
              height: "40px",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "22px",
              marginRight: "10px",
              color: " rgba(6,55,158,1)",
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
          {pages.map((page) => {
            if (page.title === "Login" && username) {
              return (
                <div key={username}>
                  <Button
                    color="inherit"
                    onClick={handleUserMenuOpen}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      height: "40px",
                      textTransform: "none",
                      fontSize: "1rem",
                      borderRadius: "22px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {username
                      .split(" ")
                      .map((n) => n[0])
                      .join(".")}
                  </Button>
                  <Menu
                    id="user-menu-appbar"
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
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
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem component="a" href="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleResetPassword}>
                      Reset password
                    </MenuItem>
                  </Menu>
                </div>
              );
            }

            return (
              <Button
                href={page.href}
                key={page.title}
                color="inherit"
                sx={{
                  height: "40px",
                  textTransform: "none",
                  fontSize: "1rem",
                  borderRadius: "22px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {page.title}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
