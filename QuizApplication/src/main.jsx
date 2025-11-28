import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoutes.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import ProfileUpdationPage from "./Pages/ProfileUpdationPage.jsx";
import LobbyPage from "./Pages/LobbyPage.jsx";
import AvailableRooms from "./Pages/AvailableRoom.jsx";
import HistoryPage from "./Pages/HistoryPage.jsx";
import LeaderboardPage from "./Pages/LeaderboardPage.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import QuizPage from "./Pages/QuizPage.jsx";
import HostPage from "./Pages/HostPage.jsx";
import QuizResult from "./Pages/QuizResult.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ import your context
import AddFriends from "./Pages/AddFriends.jsx";

// ✅ Router setup (no <Routes> here)
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}>
      {/* 🏠 Public Routes */}
      <Route index element={<LandingPage />} />
      
      <Route path="contactUs" element={<ContactUs />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="profileUpdate"
        element={
          <ProtectedRoute>
            <ProfileUpdationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="lobby"
        element={
          <ProtectedRoute>
            <LobbyPage />
          </ProtectedRoute>
        }
      />
      <Route
       path="addFriend"
       element={
         <ProtectedRoute>
           <AddFriends />
         </ProtectedRoute>
       }
      />
      <Route
        path="availableRooms"
        element={
          <ProtectedRoute>
            <AvailableRooms />
          </ProtectedRoute>
        }
      />
      <Route
        path="history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="leaderboard"
        element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="room/:roomId"
        element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="host"
        element={
          <ProtectedRoute>
            <HostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="quizResult"
        element={
          <ProtectedRoute>
            <QuizResult />
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
