// npm modules
import { NavLink }  from 'react-router-dom'

// components
import SearchBar from '../SearchBar/SearchBar'

// css
import styles from './NavBar.module.css'

// assets
import shelvedLogo from "../../assets/Shelved_Logo_V1.svg"

const NavBar = ({ user, handleLogout, handleSearch }) => {
  
  return (
    <nav>
      <div className={styles.navContainer}>
        <NavLink to="/">
          <div className={styles.logoContainer}>
            <img src={shelvedLogo} alt="Shelved Logo" className={styles.logoImage}/>
            <div className={styles.logoTitle}>Shelved</div>
          </div>
        </NavLink>

        <SearchBar handleSearch={ handleSearch }/>

        <div className={styles.links}>
          <NavLink to="/books"><i className="fa-solid fa-book" id={styles.bookIcon}></i></NavLink>
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
          <div className={styles.userLinks}>
            <i className="fa-solid fa-bars"></i>
            {user ?
              <div className={styles.userDropDown}>
                <NavLink to="/books">Books</NavLink>
                <NavLink to={`/profiles/${user.profile}`}>My Profile</NavLink>
                <NavLink to="/auth/change-password">Change Password</NavLink>
                <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
              </div>
            :
              <div className={styles.userDropDown}>
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/auth/login">Log In</NavLink>
                <NavLink to="/auth/signup">Sign Up</NavLink>
              </div>              
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
