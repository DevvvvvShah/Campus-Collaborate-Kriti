import "./App.css";
import "cors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import EditProfileCard from "./pages/editProfileCard";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
// import DiscussionForum from "./pages/DiscussionForum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
