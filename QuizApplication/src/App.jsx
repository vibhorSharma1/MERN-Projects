import { Outlet } from "react-router-dom"
import  NavBar  from "./components/NavBar"
import Footer from "./components/Footer"


function App() {
  return (
    // <Router>
    //   <AuthProvider>
    //     <GameStateProvider>
    //       <SocketProvider>
    //         <div className="min-h-screen bg-dark">
    //           <Routes>
    //             <Route path="/login" element={<LoginPage />} />
    //             <Route path="/register" element={<RegisterPage />} />

    //             <Route
    //               path="/"
    //               element={
                    
    //                   <>
    //                     <Navbar />
    //                     <LobbyPage />
    //                   </>
                    
    //               }
    //             />

    //             <Route
    //               path="/room/:roomCode"
    //               element={
    //                 <ProtectedRoute>
    //                   <>
    //                     <Navbar />
    //                     <RoomPage />
    //                   </>
    //                 </ProtectedRoute>
    //               }
    //             />

    //             <Route
    //               path="/quiz/:roomCode"
    //               element={
    //                 <ProtectedRoute>
    //                   <>
    //                     <Navbar />
    //                     <QuizPage />
    //                   </>
    //                 </ProtectedRoute>
    //               }
    //             />

    //             <Route
    //               path="/leaderboard/:roomCode"
    //               element={
    //                 <ProtectedRoute>
    //                   <>
    //                     <Navbar />
    //                     <LeaderboardPage />
    //                   </>
    //                 </ProtectedRoute>
    //               }
    //             />

    //             <Route path="*" element={<Navigate to="/" replace />} />
    //           </Routes>
    //         </div>
    //       </SocketProvider>
    //     </GameStateProvider>
    //   </AuthProvider>
    // </Router>
    <>
    <NavBar />
    <Outlet></Outlet>
    <Footer />
    </>
  )
}

export default App
