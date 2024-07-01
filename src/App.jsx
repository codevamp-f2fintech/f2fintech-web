import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import "./App.css";

import Footer from "./components/footer/Footer";
import ResponsiveAppBar from "./components/appBar/Appbar";
import Home from "./components/home/Home";
import Blogs from "./components/blogs/Blogs";
import Businessloan from "./components/businessloan/Businessloan";
import MsmeLoan from "./components/msmeLoan/MsmeLoan";
import SmallBusinessLoan from "./components/smallBusinessLoan/SmallBusinessLoan";
import UnsecuredLoan from "./components/unsecuredLoan/UnsecuredLoan";
import BusinessLoanForWomen from "./components/businessLoanForWomen/BusinessLoanForWomen";
import ECommerceBusinessLoan from "./components/eCommerceBusinessLoan/ECommerceBusinessLoan";
import ApplicationForm from "./components/application/ApplicationForm";
import { useMode } from "./theme";
import Listing from "./components/providers/Listing";
import Compare from "./components/providers/Compare";

function App() {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
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

        <Route path="/providers/listing " element={<Listing />} />
        <Route path="/providers/compare" element={<Compare />} />
        <Route exact path="/applicationForm" element={<ApplicationForm />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
