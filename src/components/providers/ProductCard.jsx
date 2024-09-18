import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Button, Typography, Checkbox, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import styled from "@emotion/styled";

import ButtonComp from "../common/button/Button";
import { Utility } from "../utility";

const StyledCard = styled(Box)(() => ({
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

const StyledCheckbox = styled(Checkbox)(() => ({
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

const ProductCard = ({
    api,
    loanProviderId,
    title,
    home,
    homeimg,
    interestRate,
    text,
    isCompared,
    handleCompareToggle,
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);    // State to track favorite status
    const navigateTo = useNavigate();

    const { getLocalStorage } = Utility();
    const customer = getLocalStorage("customerInfo");
    const token = customer?.token;

    useEffect(() => {
        api.getFavourites(loanProviderId, customer?.id)
            .then(({ data: resp }) => {
                console.log(resp, 'favorites resp');
                if (resp?.data.isFavorite) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            })
            .catch(err => {
                console.log('Error occured in Getting Favourites from db', err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Redirects the user to the login page if they are not logged in.
    const handleLoginRedirect = () => {
        setOpenDialog(false);
        navigateTo("/login");
    };

    // Adds/removes loan providers from the favorites list. If the user is not logged in, it triggers the login dialog.
    const handleFavoriteToggle = (event) => {
        event.stopPropagation();
        if (!token) {
            setOpenDialog(true);
            return;
        }

        const customerFavourite = {
            loan_provider_id: loanProviderId,
            customer_id: customer.id,
        };
        console.log(customerFavourite, isFavorite, 'loanProviderId and customer');
        api.toggleFavourite(customerFavourite, isFavorite)
            .then(res => {
                console.log('response created', res);
                setIsFavorite(!isFavorite);
            })
            .catch(err => {
                console.log('error creating favorite', err);
            })
    }

    return (
        <StyledCard>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You must be logged in to add items to your Favorites.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLoginRedirect} color="primary" autoFocus>
                        Log In
                    </Button>
                </DialogActions>
            </Dialog>


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
                    <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                        Interest Rate: {interestRate}
                    </Typography>
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
    api: PropTypes.any,
    loanProviderId: PropTypes.any,
    title: PropTypes.string.isRequired,
    home: PropTypes.bool.isRequired,
    homeimg: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
    isCompared: PropTypes.bool.isRequired,
    handleCompareToggle: PropTypes.func.isRequired,
};

export default ProductCard;
