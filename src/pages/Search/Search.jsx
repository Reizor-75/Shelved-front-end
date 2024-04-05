// npm modules
import { useState } from 'react'

//services
import  * as bookService from '../../services/bookService'

import SearchCard from '../../components/SearchCard/SearchCard'

// css
import styles from './Search.module.css'

const Search = () => {
  const [search, setSearch] = useState({})
  const [formData, setFormData] = useState({     
    category: "title",
    searchStr: ""
  })

  const handleSubmit= async evt => {
    evt.preventDefault()
    try{
      const data = await bookService.search(formData)
      setSearch(data)
    } catch(err){
      console.log(err)
    }
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (  
    <main className={styles.container}>
      <h1>Search</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className='form'>
        <select
          name="category"          
          onChange={handleChange}
          defaultValue="title"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input 
          type="text" 
          name="searchStr"
          placeholder='Search'
          onChange={handleChange}
        />
        <button type='submit'> <i className="fa-solid fa-magnifying-glass"></i></button>
      </form>

      {!search.length ? 
        <>No Books Avaiable</>:
        <div className={styles.cardContainer}>
          {search.map(book => (
            <SearchCard key={book.key} foundBook={book}/>
          ))}
      </div> }
    </main>
  );
}

export default Search;