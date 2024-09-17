import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'
import { userService } from './services/user.service'

import { AdminMain } from './pages/AdminMain'
import { PlayerMain } from './pages/PlayerMain'
import { ResultsPage } from './pages/ResultsPage'
import { LivePage } from './pages/LivePage'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

import { AppHeader } from './cmps/AppHeader'
import { AdminSignup } from './pages/AdminSignup'

export const UserContext = createContext(null);

function RoutGuard({ children }) {
  const { currentUser } = useContext(UserContext);

  function isAllowes() {
    return currentUser?.isAdmin
  }

  if(!isAllowes()) return <Navigate to="/player"/>
  return children 
}


export function App() {
  const [currentUser, setCurrentUser] = useState(userService.getLoggedinUser());

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <section className='main-app'>
          <AppHeader />
          <main className='container'>
            <Routes> 
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-signup" element={<AdminSignup />} />

              <Route path="/player" element={<PlayerMain />} />
              <Route path="/admin" element={<RoutGuard><AdminMain /></RoutGuard>} />
              <Route path="/results" element={<RoutGuard><ResultsPage /></RoutGuard>} />
              <Route path="/live/:songId" element={<LivePage />} />
              <Route index element={<Navigate to='/login' />} />
            </Routes> 
          </main>
        </section>
      </Router>
    </UserContext.Provider>
  )
}
