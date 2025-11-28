import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  register: (email, password, username) => api.post("/auth/register", { email, password, username }),
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => {
    localStorage.removeItem("token")
  },
}

export const roomAPI = {
  createRoom: (roomName) => api.post("/rooms", { roomName }),
  joinRoom: (roomCode) => api.post(`/rooms/${roomCode}/join`, {}),
  getRoomDetails: (roomCode) => api.get(`/rooms/${roomCode}`),
  leaveRoom: (roomCode) => api.post(`/rooms/${roomCode}/leave`, {}),
  startQuiz: (roomCode) => api.post(`/rooms/${roomCode}/start`, {}),
}

export const quizAPI = {
  startQuiz: (roomCode) => api.post(`/rooms/${roomCode}/start`, {}),
  submitAnswer: (roomCode, questionId, answer) => api.post(`/rooms/${roomCode}/answer`, { questionId, answer }),
  getLeaderboard: (roomCode) => api.get(`/rooms/${roomCode}/leaderboard`),
}

export default api
