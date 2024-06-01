// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import EditProfile from './pages/EditProfile/EditProfile'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Friends from './pages/Friends/Friends'
import Books from './pages/Books/Books'
import BookDetails from './pages/BookDetails/BookDetails'
import Search from './pages/Search/Search'
import Footer from './components/Footer/Footer'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [curProfile, setCurProfile] = useState()
  const [search, setSearch] = useState({})

  const navigate = useNavigate()

  useEffect(() =>{
    const fetchProfile= async () => {
      const data = await profileService.getProfile(user.profile)
      setCurProfile(data)
    }
    if(user) fetchProfile()
  },[user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleSearch = (searchData) => {
    setSearch(searchData)
    navigate('/search')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} handleSearch={handleSearch}/>
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:profileId"
          element={
            <ProtectedRoute user={user}>
              <ProfileDetails user={user}/>
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/profiles/:profileId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditProfile user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:profileId/friends"
          element={
            <ProtectedRoute user={user}>
              <Friends user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={<Books user={user} /> }
        />
        <Route
          path="/books/:bookId"
          element={<BookDetails user={user} profile={curProfile}/> }
        />
        <Route
          path="/search"
          element={<Search user={user} search={search}/> }
        />
      </Routes>

      <Footer></Footer>
    </>
  )
}

export default App
