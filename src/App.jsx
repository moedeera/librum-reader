import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Navbar } from "./Components/Navbar/Navbar";
import { AboutPage } from "./Pages/AboutPage/AboutPage";
import { SiteContextProvider } from "./Context/Context";
import { Footer } from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { LoginPage } from "./Pages/LoginPage/LoginPage";

function App() {
  return (
    <SiteContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </SiteContextProvider>
  );
}

export default App;
