// npm modules
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// services
import  * as bookService from '../../services/bookService'

// css
import styles from './NavBar.module.css'

// assets
import shelvedLogo from "../../assets/Shelved_Logo.svg"

const NavBar = ({ user, handleLogout }) => {
  const [search, setSearch] = useState({})
  const [formData, setFormData] = useState({     
    category: "title",
    searchStr: ""
  })
  const navigate = useNavigate()

  const handleSubmit= async evt => {
    evt.preventDefault()

    try{
      const data = await bookService.search(formData)
      setSearch(data)
      navigate('/search', {state:{search}})
    } catch(err){
      console.log(err)
    } 
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <img src={shelvedLogo} alt="Shelved Logo" width='100px' className={styles.logoImage}/>
          <div className={styles.logoTitle}>Shelved</div>
        </div>
        <div className={styles.links}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/search">Search</NavLink>
          {user ?
            <div className={styles.userLinks}>
                <i className="fa-solid fa-circle-user"></i>

              <div className={styles.userDropDown}>
                <NavLink to={`/profiles/${user.profile}`}>My Profile</NavLink>
                <NavLink to="/auth/change-password">Change Password</NavLink>
                <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
              </div>
            </div>
          :
            <div className={styles.userLinks}>
              {/* <img src="" alt="UserAvatar" /> */}
              <i className="fa-solid fa-circle-user"></i>
              <div className={styles.userDropDown}>
                <NavLink to="/auth/login">Log In</NavLink>
                <NavLink to="/auth/signup">Sign Up</NavLink>
              </div>
            </div>
          }
        </div>

        <div className={styles.linksMobile}>
          {user ?
            <div className={styles.userLinks}>
              <i className="fa-solid fa-bars"></i>

              <div className={styles.userDropDown}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to={`/profiles/${user.profile}`}>My Profile</NavLink>
                <NavLink to="/auth/change-password">Change Password</NavLink>
                <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
              </div>
            </div>
          :
            <div className={styles.userLinks}>
              <i className="fa-solid fa-bars"></i>
              <div className={styles.userDropDown}>
                <NavLink to="/auth/login">Log In</NavLink>
                <NavLink to="/auth/signup">Sign Up</NavLink>
              </div>
            </div>
          }
        </div>

        <div className={styles.searchBar}>
          <form autoComplete="off" onSubmit={handleSubmit} className='form'>
            <select
              name="category"          
              onChange={handleChange}
              defaultValue="title"
              className={styles.typeSelect}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="ISBN">ISBN</option>
            </select>
            <input 
              type="text" 
              name="searchStr"
              placeholder='Search'
              onChange={handleChange}
              className={styles.searchInput}
            />
            
            <button type='submit' className={styles.searchButton}><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
