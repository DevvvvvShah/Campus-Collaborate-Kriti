import "./App.css";
import "cors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfileCard from "./pages/editProfileCard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editProfile" element={<EditProfileCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
