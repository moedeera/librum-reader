import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Homepage } from "./Pages/Homepage/Homepage";
import { Navbar } from "./Components/Navbar/Navbar";
import { AboutPage } from "./Pages/AboutPage/AboutPage";
import { SiteContextProvider } from "./Context/Context";
import { Footer } from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { PostStory } from "./Pages/PostStory/PostStory";
import { AllComponents } from "./Pages/AllComponents/AllComponents";
import { Stories } from "./Pages/Stories/Stories";
import { ContactPage } from "./Pages/ContactPage/ContactPage";
import { StoryPage } from "./Pages/StoryPage/StoryPage";
import { Register } from "./Pages/Register/Register";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { MessagesPage } from "./Pages/MessagesPage/MessagesPage";

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
              <Route path="/write" element={<PostStory />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/all" element={<AllComponents />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Routes>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </SiteContextProvider>
  );
}

export default App;
