import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfileCard from "./pages/editProfileCard";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import DiscussionForum from "./pages/DiscussionForum";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/discussion" element={<DiscussionForum />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projectview" element={<ProjectView />} />
        <Route path="/editProfile" element={<EditProfileCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
