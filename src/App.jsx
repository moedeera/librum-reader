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
import { ContactPage } from "./Pages/ContactPage/ContactPage";
import { StoryPage } from "./Pages/StoryPage/StoryPage";
import { Register } from "./Pages/Register/Register";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { MessagesPage } from "./Pages/MessagesPage/MessagesPage";
import { ErrorPage } from "./Pages/ErrorPage/ErrorPage";
import { AccountPage } from "./Pages/AccountPage/AccountPage";
import { Testing } from "./Pages/Testing/Testing";

import { StoryInfo } from "./Pages/StoryInfo/StoryInfo";
import { HomeFeed } from "./Pages/HomeFeed/HomeFeed";
import { CommunityPage } from "./Pages/CommunityPage/CommunityPage";
import { UpdatesPage } from "./Pages/UpdatesPage/UpdatesPage";
import { MyStoriesPage } from "./Pages/MyStoriesPage/MyStoriesPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import { SearchPage } from "./Pages/SearchPage/SearchPage";
import { UserPage } from "./Pages/UserPage/UserPage";
import { ProfileSetupPage } from "./Pages/ProfileSetupPage/ProfileSetupPage";
import AuthPage from "./Pages/AuthPage.js/AuthPage";
import { AuthProvider } from "./Context/AuthContext";
import { CreateStory } from "./Pages/CreateStory/CreateStory";
import DraftPage from "./Pages/DraftPage/DraftPage";
import CreateStoryPage from "./Pages/CreateStoryPage/CreateStoryPage";

function App() {
  return (
    <SiteContextProvider>
      <AuthProvider>
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
                <Route path="/home" element={<HomeFeed />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/signin" element={<AuthPage />} />
                <Route path="/create" element={<CreateStory />} />
                <Route path="/write" element={<CreateStoryPage />} />
                <Route path="/storyinfo" element={<StoryInfo />} />
                <Route path="mystory/:id" element={<PostStory />} />
                <Route path="mystories" element={<MyStoriesPage />} />
                <Route path="mystories/:draftid" element={<DraftPage />} />
                <Route path="edit/:draftid" element={<DraftPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/browse/:searchWord" element={<SearchPage />} />
                <Route
                  path="/profiles"
                  element={<Navigate replace to="/profiles/librum" />}
                />
                <Route path="/profiles/:userid" element={<ProfilePage />} />
                <Route path="/setup" element={<ProfileSetupPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/updates" element={<UpdatesPage />} />
                <Route path="/all" element={<AllComponents />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/stories/:searchWord" element={<SearchPage />} />
                <Route
                  path="/stories"
                  element={<Navigate replace to="/stories/all" />}
                />
                <Route
                  path="/story"
                  element={<Navigate replace to="/stories/all" />}
                />
                <Route path="/story/:storyidorslug" element={<StoryPage />} />
                <Route path="/user/:userid" element={<UserPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/testing" element={<Testing />} />
              </Routes>
            </ScrollToTop>
            <Footer />
          </Router>
        </div>
      </AuthProvider>
    </SiteContextProvider>
  );
}

export default App;
