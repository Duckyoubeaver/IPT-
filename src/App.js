import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/pages/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import VotingPage from "./components/pages/VotingPage";
import Home from "./components/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AdminNavBar from "./components/pages/AdminNavbar";
import LinkSignup from "./components/pages/TeacherSignup";
import InvitationHandler from "./components/pages/InviteHandler";
import SignIn from "./components/pages/SignIn";
import Gallery from "./components/pages/Gallery";
import About from "./components/pages/About";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/register/:token" element={<LinkSignup />} />
            <Route path="/join/:token" element={<InvitationHandler />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route
              path="/vote" //question mark says its optional parameter
              element={
                <ProtectedRoute>
                  <VotingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin" //question mark says its optional parameter
              element={<AdminNavBar />}
            />
            {/* Default route to Home (if no other route matches) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
