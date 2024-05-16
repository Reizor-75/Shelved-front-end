// npm module
import { NavLink } from "react-router-dom";

// css
import styles from "./ProfileCard.module.css"

const ProfileCard = ({profile}) => {
  return ( 
    <NavLink to={`/profiles/${profile._id}`}>
      
      <div className={styles.card}>
        <img 
            src={profile.photo}
            alt={`${profile.name}'s avatar`} 
            className={styles.profileAvatar}
          />
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{profile.name}</div>
          </div>
      </div>
      <hr/>
    </NavLink>
  );
}

export default ProfileCard;