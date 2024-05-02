//npm module
import { NavLink } from "react-router-dom";

const ProfileCard = ({profile}) => {
  return ( 
    <NavLink to={`/profiles/${profile._id}`}>
      <img 
        src={profile.photo}
        alt={`${profile.name}'s avatar`} 
        className={profile.profileAvatar}
      />
    </NavLink>
    
  );
}

export default ProfileCard;