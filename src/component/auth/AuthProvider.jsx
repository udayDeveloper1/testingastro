import React, { createContext, useContext, useMemo, useState } from 'react'

// Create the AuthContext
const AuthContext = createContext(null)

// AuthProvider component optimized to prevent unnecessary re-renders
export const AuthProvider = React.memo(({ children }) => {
  const [user, setUser] = useState(null)

  // Memoize the login and logout functions to prevent re-creating them on every render
  const login = userData => {
    setUser(userData)
    localStorage.setItem('token', userData.token) // Store token in localStorage
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  ) // Only re-create the value when `user` changes

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
})

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
