//npm module
import { useLocation } from "react-router-dom";

//component
import ProfileCard from "../../components/ProfileCard/ProfileCard";

//css
import styles from "./Friends.module.css"

const Friends = () => {
  const { state } = useLocation()

console.log(state)
  return (      
    <main className={styles.container}>
      {state.name}'s Friends

      {state.following ? 
        <>
          {state.following.map(friend =>
            <ProfileCard key={friend._id} profile={friend}/>
          )}
        </>
        : 
        <>No friends</>
      }

    </main>
  );
}

export default Friends;