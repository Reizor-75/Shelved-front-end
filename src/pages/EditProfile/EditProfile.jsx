// npm modules
import { useState } from 'react'
import { useLocation } from "react-router-dom"

// css
import styles from './EditProfile.module.css'

const EditProfile = () => {
  const { state } = useLocation()
  const [formData, setFormData] = useState(state)
  
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }    

  const handleSubmit = (evt) => {
    evt.preventDefault()
  }

  return (  
    <main className={styles.container}>
      <div>Edit {formData.name}'s Profile </div>
      <form autoComplete="off"  onSubmit={handleSubmit}>
      <label className={styles.label}>
          Name
          <input type="text" value={formData.name} name="name" onChange={handleChange} />
        </label> 
      </form>
    </main>
  );
}

export default EditProfile;