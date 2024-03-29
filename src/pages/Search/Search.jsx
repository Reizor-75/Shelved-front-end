// npm modules
import { useState } from 'react'

// css
import styles from './Search.module.css'

const Search = () => {
  const [formData, setFormData] = useState()

  const handleSubmit= async evt => {
    evt.preventDefault()
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (  
    <main className={styles.container}>
      <h1>Search</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className='form'>
        <select
          name=""          
          onChange={handleChange}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input 
          type="text" 
          placeholder='Search'
          onChange={handleChange}
        />
        <button type='submit'> <i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </main>
  );
}

export default Search;