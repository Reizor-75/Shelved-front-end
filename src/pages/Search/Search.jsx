// npm modules
// import { useEffect, useState } from 'react'

//services
// import  * as bookService from '../../services/bookService'

// import { useLocation } from 'react-router-dom'
import SearchCard from '../../components/SearchCard/SearchCard'

// css
import styles from './Search.module.css'

const Search = ({search}) => {

  if(!search){
    return (
      <main className={styles.container}>
        <div className={styles.error}>Loading Search Results...</div>
      </main>
    )
  }
  return (  
    <main className={styles.container}>
      <h1>Search</h1>
      {/* <form autoComplete="off" onSubmit={handleSubmit} className='form'>
        <select
          name="category"          
          onChange={handleChange}
          defaultValue="title"
          className={styles.typeSelect}
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
          className={styles.searchInput}
        />
        <button type='submit' className={styles.searchButton}> <i className="fa-solid fa-magnifying-glass"></i></button>
      </form> */}
      
      {!search.length ? 
        <div className={styles.searchResult}>No Books Avaiable</div>
        :
        <div className={styles.cardContainer}>
          {search.map(book => (
            <SearchCard key={book.key} foundBook={book}/>
          ))}
        </div>
      }
    </main>
  );
}

export default Search;