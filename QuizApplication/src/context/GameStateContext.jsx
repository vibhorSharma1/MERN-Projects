"use client"

import React, { createContext, useState, useCallback } from "react"

export const GameStateContext = createContext()

export const GameStateProvider = ({ children }) => {
  // Room state
  const [currentRoom, setCurrentRoom] = useState(null)
  const [players, setPlayers] = useState([])
  const [isHost, setIsHost] = useState(false)

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState([])

  // Connection state
  const [connectionStatus, setConnectionStatus] = useState("disconnected") // disconnected, connecting, connected
  const [error, setError] = useState(null)

  const resetQuizState = useCallback(() => {
    setCurrentQuestion(null)
    setCurrentQuestionIndex(0)
    setTotalQuestions(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setTimeLeft(30)
    setLeaderboard([])
  }, [])

  
  const resetRoomState = useCallback(() => {
    setCurrentRoom(null)
    setPlayers([])
    setIsHost(false)
    resetQuizState()
  }, [resetQuizState])

  const updateConnectionStatus = useCallback((status) => {
    setConnectionStatus(status)
    if (status === "connected") {
      setError(null)
    }
  }, [])

  const setErrorWithTimeout = useCallback((errorMsg, timeout = 5000) => {
    setError(errorMsg)
    if (timeout > 0) {
      setTimeout(() => setError(null), timeout)
    }
  }, [])

  const value = {
    // Room state
    currentRoom,
    setCurrentRoom,
    players,
    setPlayers,
    isHost,
    setIsHost,

    // Quiz state
    currentQuestion,
    setCurrentQuestion,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    totalQuestions,
    setTotalQuestions,
    selectedAnswer,
    setSelectedAnswer,
    answered,
    setAnswered,
    timeLeft,
    setTimeLeft,

    // Leaderboard state
    leaderboard,
    setLeaderboard,

    // Connection state
    connectionStatus,
    updateConnectionStatus,
    error,
    setErrorWithTimeout,

    // Actions
    resetQuizState,
    resetRoomState,
  }

  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>
}

export const useGameState = () => {
  const context = React.useContext(GameStateContext)
  if (!context) {
    throw new Error("useGameState must be used within GameStateProvider")
  }
  return context
}
