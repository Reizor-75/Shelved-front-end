// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './EditProfile.module.css'

const EditProfile = () => {
  const navigate = useNavigate()
  const imgInputRef = useRef(null)

  const { state } = useLocation()
  const [formData, setFormData] = useState(state)
  
  const [message, setMessage] = useState('')
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChangePhoto = evt => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid) {
      imgInputRef.current.value = null
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await profileService.updateProfile(formData, photoData.photo)
      navigate(`/profiles/${formData._id}`)
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name } = formData

  const isFormInvalid = () => {
    return !(name)
  }

  return (  
    <main className={styles.container}>
      <div>Edit {state.name}'s Profile</div>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input type="text" value={name} name="name" onChange={handleChange} />
        </label>
        <label className={styles.label}>
          Upload Photo
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>
        <div>
          <Link to="/">Cancel</Link>
          <button
            className={styles.button}
            disabled={ isFormInvalid() || isSubmitted }
          >
            {!isSubmitted ? 'Update' : '🚀 Sending...'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditProfile;