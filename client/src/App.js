import "./App.css";
import "cors";
import Profile from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <a href="http://localhost:3000/auth/signin">Home</a>
      <Profile />
    </div>
  );
}

export default App;
