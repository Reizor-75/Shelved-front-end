// npm module
import { NavLink } from "react-router-dom";

// css
import styles from "./ProfileCard.module.css"

const ProfileCard = ({profile}) => {
  return ( 
    <NavLink to={`/profiles/${profile._id}`}>
      
      <img 
        src={profile.photo}
        alt={`${profile.name}'s avatar`} 
        className={styles.profileAvatar}
      />
      <div className={styles.profileInfo}>
        {profile.name}
      </div>
    </NavLink>
  );
}

export default ProfileCard;