import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoanProviders } from "../../redux/actions/LoanProviderAction";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import API from "../../apis";
import ButtonComp from "../common/button/Button";
import { Utility } from "../utility";

const StyledCard = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 300,
  margin: "1rem",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "50%",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: "0.25rem 0.5rem",
  minWidth: "80px",
}));

const ProductCard = ({
  title,
  home,
  homeimg,
  interestRate,
  text,
  isFavorite,
  handleFavoriteToggle,
  isCompared,
  handleCompareToggle,
}) => {
  return (
    <StyledCard>
      <Box sx={{ position: "relative" }}>
        <img
          src={homeimg}
          alt={title}
          style={{ height: 160, width: "100%", objectFit: "cover" }}
        />
        <StyledCheckbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          checked={isFavorite}
          onChange={handleFavoriteToggle}
        />
      </Box>
      <Box p={2}>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {text.description}
        </Typography>
        {home && (
          <>
            <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
              Interest Rate: {interestRate}%
            </Typography>
          </>
        )}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonComp title="Calculate Returns" width="160px" />
          <Checkbox
            checked={isCompared}
            onChange={handleCompareToggle}
            sx={{ ml: "auto" }}
          />
        </Box>
      </Box>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
  isCompared: PropTypes.bool.isRequired,
  handleCompareToggle: PropTypes.func.isRequired,
};

const Filter = ({ filter, setFilter }) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <FormControl fullWidth sx={{ width: "15%" }}>
      <InputLabel id="filter-label">Sort By</InputLabel>
      <Select
        labelId="filter-label"
        value={filter}
        label="Filter by"
        onChange={(e) => setFilter(e.target.value)}
      >
        <MenuItem value="interestRate">Interest Rate</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="popular">Popular Banks</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

const Listing = () => {
  const location = useLocation(); // Add this line
  const navigate = useNavigate(); // Add this line
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("interestRate");
  const [favorites, setFavorites] = useState([]);
  const [compares, setCompares] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const loanProviders = useSelector((state) => state.allLoanProviders);
  const { getLocalStorage } = Utility();
  const [openDialog, setOpenDialog] = useState(false); 

  const customer = getLocalStorage("customerInfo");

  const token = customer?.token;

  useEffect(() => {
    if (location.state?.showFavorites) {
      setShowFavorites(true);
      setFavorites(location.state.favoriteItems || []);
    }
  }, [location.state]);

  useEffect(() => {
    API.LoanProviderAPI.getAll()
      .then((response) => {
        if (response.data.status === "Success") {
          dispatch(
            setLoanProviders({
              listData: response.data.data.rows,
            })
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "loanproviderapierror");
        setLoading(false);
      });
  }, [dispatch]);

 const isLoggedIn =()=> {
  //  if(!token){
    // navigate("/login");
   
 }

  const handleFavoriteToggle = (item) => {
    if (!token) {
      // If the user is not logged in, open the login dialog
      setOpenDialog(true);
      return;
    }
    
    // If the user is logged in, update the favorites
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(item)
        ? prevFavorites.filter((fav) => fav !== item)
        : [...prevFavorites, item];
      
      // Save the updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  
  
  
  useEffect(() => {
    // Load favorites from localStorage on component mount
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);
  const handleCompareToggle = (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveAll = () => {
    setCompares([]);
    handlePopoverClose();
  };

  const handleShowFavorites = () => {
    navigate("/providers/FavouriteCard", { state: { favoriteItems: favorites } });
  };

  const handleProceedToCompare = () => {
    navigate("/providers/Compare", { state: { compares } });
    handlePopoverClose();
  };


  const open = Boolean(anchorEl);

  const getFilteredData = () => {
    let sortedData = [...(loanProviders?.listData || [])];
    if (filter === "interestRate") {
      sortedData.sort((a, b) => a.interest_rate - b.interest_rate);
    } else if (filter === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    return sortedData;
  };

  const handleDialogClose = () => {
    setOpenDialog(true);
    navigate("/FavouriteCard");
  };

  const handleLoginRedirect = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Filter filter={filter} setFilter={setFilter} />
      <Button
        // variant="contained"
        // color="primary"
        // onClick={handleShowFavorites}
        // sx={{ marginBottom: 2 }}
      >
        {/* Show Favorites */}
      </Button>
      <Grid container spacing={4}>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be logged in to add items to your favorites.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginRedirect} color="primary" autoFocus>
            Log In
          </Button>
        </DialogActions>
      </Dialog>
        {getFilteredData().map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard
              title={item.title}
              home={item.home}
              homeimg={item.homeimage}
              interestRate={item.interest_rate}
              text={{
                description: item.description,
                short_description: item.short_description,
                long_description: item.long_description,
              }}
              isFavorite={favorites.includes(item)}
              handleFavoriteToggle={() => handleFavoriteToggle(item)}
              isCompared={compares.includes(item)}
              handleCompareToggle={() => handleCompareToggle(item)}
            />
          </Grid>
        ))}
      </Grid>
      {compares.length > 0 && (
        <Box sx={{ position: "fixed", right: 16, bottom: 8, zIndex: 999 }}>
          <Button
            onClick={handlePopoverClick}
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(135deg, #2c3ce3 0%, #000DFF 100%)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
            }}
          >
            Compare
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={handlePopoverClose}
            PaperProps={{
              sx: {
                p: 2,
                width: 300,
                maxWidth: "90%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Compare Products</Typography>
              <IconButton size="small" onClick={handlePopoverClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {compares.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                No products selected for comparison.
              </Typography>
            ) : (
              <>
                {compares.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2">{item.title}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleCompareToggle(item)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <StyledButton onClick={handleRemoveAll}>
                    Remove All
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={handleProceedToCompare}
                  >
                    Compare
                  </StyledButton>
                </Box>
              </>
            )}
          </Popover>
        </Box>
        
      )}
      
    </Container>
  );
  
};

export default Listing;