import io from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000"

let socket = null
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5

export const initSocket = (token) => {
  if (socket?.connected) return socket

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    transports: ["websocket", "polling"],
  })

  socket.on("connect", () => {
    console.log("[Socket] Connected:", socket.id)
    reconnectAttempts = 0
  })

  socket.on("disconnect", (reason) => {
    console.log("[Socket] Disconnected:", reason)
    if (reason === "io server disconnect") {
      // Server disconnected, attempt to reconnect
      socket.connect()
    }
  })

  socket.on("connect_error", (error) => {
    console.error("[Socket] Connection error:", error)
    reconnectAttempts++
  })

  socket.on("error", (error) => {
    console.error("[Socket] Error:", error)
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    reconnectAttempts = 0
  }
}

export const emitEvent = (event, data) => {
  if (socket?.connected) {
    console.log(data)
    socket.emit(event, data)
  } else {
    console.warn(`[Socket] Cannot emit ${event} - socket not connected`)
  }
}

export const onEvent = (event, callback) => {
  if (socket) {
    socket.on(event, callback)
  }
}

export const offEvent = (event, callback) => {
  if (socket) {
    socket.off(event, callback)
  }
}

export const onceEvent = (event, callback) => {
  if (socket) {
    socket.once(event, callback)
  }
}

export default socket
