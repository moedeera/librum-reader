import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Navbar } from "./Components/Navbar/Navbar";
import { AboutPage } from "./Pages/AboutPage/AboutPage";
import { SiteContextProvider } from "./Context/Context";

function App() {
  return (
    <SiteContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
    </SiteContextProvider>
  );
}

export default App;
