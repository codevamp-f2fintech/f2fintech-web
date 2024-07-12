import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./App.css";

import Footer from "./components/footer/Footer";
import ResponsiveAppBar from "./components/appBar/Appbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Blogs from "./components/blogs/Blogs";
import ResetPassword from "./components/login/Resetpassword";
import Businessloan from "./components/businessloan/Businessloan";
import MsmeLoan from "./components/msmeLoan/MsmeLoan";
import SmallBusinessLoan from "./components/smallBusinessLoan/SmallBusinessLoan";
import UnsecuredLoan from "./components/unsecuredLoan/UnsecuredLoan";
import BusinessLoanForWomen from "./components/businessLoanForWomen/BusinessLoanForWomen";
import ECommerceBusinessLoan from "./components/eCommerceBusinessLoan/ECommerceBusinessLoan";
import ApplicationForm from "./components/application/ApplicationForm";
import { useMode } from "./theme";
import Profile from "./components/login/Profile";

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
            <Route exact path="/businessLoan" element={<Businessloan />} />
            <Route exact path="/MsmeLoan" element={<MsmeLoan />} />
            <Route
              exact
              path="/SmallBusinessLoan"
              element={<SmallBusinessLoan />}
            />
            <Route exact path="/UnsecuredLoan" element={<UnsecuredLoan />} />
            <Route
              exact
              path="/BusinessLoanForWomen"
              element={<BusinessLoanForWomen />}
            />
            <Route
              exact
              path="/ECommerceBusinessLoan"
              element={<ECommerceBusinessLoan />}
            />

            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route
              exact
              path="/applicationForm"
              element={<ApplicationForm />}
            />
            <Route exact path="/reset-password" element={<ResetPassword />} />
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
