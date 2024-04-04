// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/books`

async function getAllBooks() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function getBook(bookId) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addToRead(bookId){
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/readlist`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addToWish(bookId){
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/wishlist`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addReview(bookId, formData){
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/review`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteReview(bookId, reviewId){
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function search(query) {
  try {
    const res = await fetch(`${BASE_URL}/search`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)

    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function create(bookData) {
  try {
    
    const res = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}


export { 
  getAllBooks,
  getBook,
  addToRead,
  addToWish,
  addReview,
  deleteReview,
  search,
  create,
}