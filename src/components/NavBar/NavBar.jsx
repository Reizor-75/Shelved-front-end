// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.logoContainer}>
        <img src="" alt="Shelved Logo"  className={styles.logoImage}/>
        <div className={styles.logoTitle}>Shelved</div>
      </div>
      <div className={styles.links}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        {user ?
          <div className={styles.userLinks}>
            <img src="" alt="UserAvatar" />
            <div className={styles.userDropDown}>
              <NavLink to={`/profiles/${user.profile}`}>My Profile</NavLink>
              <NavLink to="/auth/change-password">Change Password</NavLink>
              <NavLink to="" onClick={handleLogout}>LOG OUT</NavLink>
            </div>
          </div>
        :
          <div className={styles.userLinks}>
            <img src="" alt="UserAvatar" />
            <div className={styles.userDropDown}>
              <NavLink to="/auth/login">Log In</NavLink>
              <NavLink to="/auth/signup">Sign Up</NavLink>
            </div>
          </div>
        }
      </div>
    </nav>
  )
}

export default NavBar
