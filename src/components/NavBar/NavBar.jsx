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
        <NavLink to="/books">Books</NavLink>
        {user ?
          <ul>
            <li>Welcome, {user.name}</li>
            <li><NavLink to="/profiles">Profiles</NavLink></li>
            <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
            <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
          </ul>
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
