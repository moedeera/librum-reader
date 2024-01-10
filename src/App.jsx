import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import { ErrorPage } from "./Pages/ErrorPage/ErrorPage";
import { AccountPage } from "./Pages/AccountPage/AccountPage";
import { Testing } from "./Pages/Testing/Testing";
import { WritePage } from "./Pages/WritePage/WritePage";
import { StoryInfo } from "./Pages/StoryInfo/StoryInfo";

function App() {
  return (
    <SiteContextProvider>
      <div className="App">
        <Router>
          <Navbar />
          <ScrollToTop>
            <Routes>
              <Route path="/*" element={<ErrorPage story={false} />} />
              <Route
                path="/story-not-found"
                element={<ErrorPage story={true} />}
              />
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/write" element={<WritePage />} />
              <Route path="/storyinfo" element={<StoryInfo />} />
              <Route path="mystory/:id" element={<PostStory />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/all" element={<AllComponents />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/stories/:search" element={<Stories />} />
              <Route
                path="/stories"
                element={<Navigate replace to="/stories/all" />}
              />
              <Route
                path="/story"
                element={<Navigate replace to="/stories/all" />}
              />
              <Route path="/story/:storyidorslug" element={<StoryPage />} />

              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/testing" element={<Testing />} />
            </Routes>
          </ScrollToTop>
          <Footer />
        </Router>
      </div>
    </SiteContextProvider>
  );
}

export default App;
