// npm modules
import { NavLink }  from 'react-router-dom'

// components
import SearchBar from '../SearchBar/SearchBar'

// css
import styles from './NavBar.module.css'

// assets
import shelvedLogo from "../../assets/Shelved_Logo.svg"

const NavBar = ({ user, handleLogout }) => {
  
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
          {/* <NavLink to="/search">Search</NavLink> */}
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
        <SearchBar />
      </div>
    </nav>
  )
}

export default NavBar
