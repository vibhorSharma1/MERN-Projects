import React, { useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { SiRepublicofgamers } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function NavBar() {
 const { user } = useContext(AuthContext);
 const isLoggedIn = !!user;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleLogin() {
    navigate('/login');
  }
  function handleLobby(){
    navigate('/lobby');
  }
  function handleRoom() {
    navigate('/availableRooms');
  }
  function handleHistory() {
    navigate('/history');
  }
  function handleLeaderBoard() {
    navigate('/leaderboard');
  }
  function handleContactUs() {
    navigate('/contactUs');
  }

  return (
    <div className='flex justify-between items-center p-1 bg-background-dark text-white border-b border-purple-900/50 '>
      <div className='flex  items-center gap-4 ml-2'>
        <div className='text-7xl text-purple-400 ml-20'><SiRepublicofgamers /></div>
        <div className='font-gothic text-4xl font-bold' onClick={handleLobby}>QuizzY</div>
      </div>

      {
        isLoggedIn ? (
          <div className='flex gap-15 items-center font-gothic text-[20px]'>
            <a href='' className='transition-all duration-300 hover:text-purple-300 hover:scale-110' onClick={handleRoom}>Rooms</a>
            <a href='' className='transition-all duration-300 hover:text-purple-300 hover:scale-110' onClick={handleHistory}>History</a>
            <a href='' className='transition-all duration-300 hover:text-purple-300 hover:scale-110' onClick={handleLeaderBoard}>LeaderBoard</a>
            <a href='' className='transition-all duration-300 hover:text-purple-300 hover:scale-110' onClick={handleContactUs}>Contact Us</a>
            <div className='text-4xl text-cyan-400 mr-20'
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            ><CgProfile /></div>
          </div>
        ) : (
          <div className='flex gap-15 items-center font-gothic text-[20px]'>
            <a href='#features' className='transition-all duration-300 hover:text-purple-300 hover:scale-110'>Features</a>
            <a href='#aboutUs' className='transition-all duration-300 hover:text-purple-300 hover:scale-110'>About Us</a>
            <a href='#ContectUs' className='transition-all duration-300 hover:text-purple-300 hover:scale-110'>Contact Us</a>
            <div className="flex gap-4 mr-20">
              <button className="w-30 bg-indigo-950 p-2 rounded-2xl font-gothic font-semibold text-[15px] text-white 
    transition-all duration-300 hover:bg-indigo-800 hover:scale-105 hover:shadow-lg hover:shadow-indigo-700/40"
         onClick={handleLogin}
    >
                LOGIN
              </button>
              

              <button className="w-30 bg-purple-700 p-2 rounded-2xl font-gothic font-bold text-[15px] text-slate-300 
    transition-all duration-300 hover:bg-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-700/40"
    onClick={handleLogin}
    >
                SIGN UP
              </button>
            </div>

          </div>
        )
      }
        < div
        onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 right-0 h-70 w-64 rounded-2xl bg-background-dark text-white shadow-2xl transform transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
        }`}
      >
      <div className="p-6 font-gothic space-y-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-8 border-b border-purple-600 pb-2">
          UserName
        </h2>

        <button className="block w-full text-left hover:text-purple-400 transition-all">
          👤 Profile
        </button>
        <button className="block w-full text-left hover:text-purple-400 transition-all">
          ⚙️ Settings
        </button>
        <button className="block w-full text-left hover:text-purple-400 transition-all">
         🪙 Refer And Earn
        </button>
        <button className="block w-full text-left text-red-400 hover:text-red-500 transition-all">
          🚪 Logout
        </button>
      </div>
    </div >
      

    </div >
  )
}

export default NavBar