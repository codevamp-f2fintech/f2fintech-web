import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./App.css";

import ApplicationForm from "./components/application/ApplicationForm";
import Blogs from "./components/blogs/Blogs";
import Businessloan from "./components/businessloan/Businessloan";
import BusinessLoanForWomen from "./components/businessLoanForWomen/BusinessLoanForWomen";
import Compare from "./components/providers/Compare";
import ECommerceBusinessLoan from "./components/eCommerceBusinessLoan/ECommerceBusinessLoan";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Listing from "./components/providers/Listing";
import Login from "./components/login/Login";
import MsmeLoan from "./components/msmeLoan/MsmeLoan";
import Profile from "./components/login/Profile";
import ResponsiveAppBar from "./components/appBar/Appbar";
import ResetPassword from "./components/login/Resetpassword";
import SmallBusinessLoan from "./components/smallBusinessLoan/SmallBusinessLoan";
import UnsecuredLoan from "./components/unsecuredLoan/UnsecuredLoan";
import FavouriteCard from "./components/providers/FavouriteCard";

import { useMode } from "./theme";
import Loan from "./components/loantracking/loantracking";

function App() {
  const [theme] = useMode();
  const location = useLocation();
  const { pathname } = location;

  return (
    <ThemeProvider theme={theme}>
      {pathname !== "/login" ? (
        <>
          <ResponsiveAppBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/business-loan" element={<Businessloan />} />
            <Route exact path="/msme-loan" element={<MsmeLoan />} />
            <Route
              exact
              path="/small-business-loan"
              element={<SmallBusinessLoan />}
            />
            <Route exact path="/unsecured-loan" element={<UnsecuredLoan />} />
            <Route
              exact
              path="/business-loan-for-women"
              element={<BusinessLoanForWomen />}
            />
            <Route
              exact
              path="/ecommerce-business-loan"
              element={<ECommerceBusinessLoan />}
            /> 
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/providers" element={<Listing />} />
            <Route exact path="/providers/compare" element={<Compare />} />
            <Route
              exact
              path="/application-form"
              element={<ApplicationForm />}
            />
            <Route exact path="/providers/favourite-card" element={<FavouriteCard />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route
              exact
              path="/loan-tracker" 
              element={<Loan />}
            />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <ResponsiveAppBar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
