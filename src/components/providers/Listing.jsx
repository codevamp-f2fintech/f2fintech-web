import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  IconButton,
  Popover
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

import API from "../../apis";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

import { setLoanProviders } from "../../redux/actions/LoanProviderAction";

const StyledButton = styled(Button)(() => ({
  fontSize: "0.8rem",
  padding: "0.25rem 0.5rem",
  minWidth: "80px",
}));

const Listing = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("interestRate");
  const [compares, setCompares] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const loanProviders = useSelector((state) => state.allLoanProviders);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    API.LoanProviderAPI.getAll()
      .then((response) => {
        console.log(response.data, "response")
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
        console.log(error, "loan provider api error");
        setLoading(false);
      });
  }, [dispatch]);

  const handlePopoverClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  // Adds/removes loan providers from the compare list.
  const handleCompareToggle = (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  // Clears the compare list.
  const handleRemoveAll = () => {
    setCompares([]);
    handlePopoverClose();
  };

  // Redirects the user to a comparison page with selected items.
  const handleProceedToCompare = () => {
    navigate("/providers/Compare", { state: { compares } });
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);

  const getFilteredData = useMemo(() => {
    const sortedData = [...(loanProviders?.listData || [])];
    return filter === "interestRate"
      ? sortedData.sort((a, b) => a.interest_rate - b.interest_rate)
      : sortedData.sort((a, b) => b.rating - a.rating);
  }, [loanProviders?.listData, filter]);

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
      <Grid container spacing={4}>
        {getFilteredData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductCard
              api={API.CustomerFavouriteAPI}
              loanProviderId={item.id}
              title={item.title}
              home={item.is_home}
              homeimg={item.home_image}
              interestRate={item.interest_rate}
              text={{
                description: item.description,
                short_description: item.short_description,
                long_description: item.long_description,
              }}
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
