import "./App.css";
import "cors";
import Profile from "./pages/ProfilePage";
import EditProfileCard from "./pages/editProfileCard";
import DiscussionForum from "./pages/DiscussionForum";

function App() {
  return (
    <div className="App">
      <DiscussionForum />
    </div>
  );
}

export default App;
