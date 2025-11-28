"use client"

import React, { createContext, useEffect, useState, useCallback } from "react"
import { initSocket, disconnectSocket, emitEvent, onEvent, offEvent } from "../services/socket"
import { useAuth } from "./AuthContext"
import { useGameState } from "./GameStateContext"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { token } = useAuth()
  const { updateConnectionStatus, setErrorWithTimeout } = useGameState()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (token) {
      try {
        updateConnectionStatus("connecting")
        const newSocket = initSocket(token)
        setSocket(newSocket)

        const handleConnect = () => {
          updateConnectionStatus("connected")
        }

        const handleDisconnect = () => {
          updateConnectionStatus("disconnected")
        }

        const handleError = (error) => {
          setErrorWithTimeout(`Connection error: ${error.message || "Unknown error"}`)
        }

        newSocket.on("connect", handleConnect)
        newSocket.on("disconnect", handleDisconnect)
        newSocket.on("error", handleError)

        return () => {
          newSocket.off("connect", handleConnect)
          newSocket.off("disconnect", handleDisconnect)
          newSocket.off("error", handleError)
        }
      } catch (error) {
        console.error("Failed to initialize socket:", error)
        setErrorWithTimeout("Failed to connect to server")
        updateConnectionStatus("disconnected")
      }
    }

    return () => {
      if (socket) {
        disconnectSocket()
      }
    }
  }, [token, updateConnectionStatus, setErrorWithTimeout])

  const value = {
    socket,
    emitEvent: useCallback((event, data) => emitEvent(event, data), []),
    onEvent: useCallback((event, callback) => {
      onEvent(event, callback)
      return () => offEvent(event, callback)
    }, []),
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const context = React.useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider")
  }
  return context
}
