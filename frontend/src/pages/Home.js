import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utils'
import { useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

function Home() {
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const userName = localStorage.getItem('name')
    // console.log(userName)
    const userEmail = localStorage.getItem('email')
    // console.log(userEmail)
    setLoginUser(userName)
  }, [])

  const handleLogout = (e) => {
    try
    {
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      handleSuccess('Logged out succesfully.')
      setTimeout(() => {
        navigate('/login')
        handleSuccess('Logged out succesfully.')
      },1000)
    }
    catch (e)
    {
      handleError(e)
    }
  }

  const fetchProducts = async () => {
    try
    {
      const url = 'https://mern-auth-app-api.vercel.app/products'
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      // console.log(result)
      setProducts(result)
    }
    catch (e)
    {
      handleError(e)
    }
  } 

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products)

  return (
    <div>
      <h1>Welcome {loginUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <h3>Products</h3>
      <div>
        {products && products?.map((item, index) => (
          <ul key={index}>
            <span>{item.name}:{item.price}</span>
          </ul>
        ))}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
