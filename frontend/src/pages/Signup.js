import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Signup() {

    const navigate = useNavigate()
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)
        const copySignupInfo = { ...signupInfo }
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }
    // console.log('Log in info : ',loginInfo)

    const handleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfo
        if (!name || !email || !password)
        {
            return handleError('All fields are required.')
        }

        try
        {
            const url = 'https://mern-auth-app-api.vercel.app/auth/signup'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const { success, message, error } = result
            if (success)
            {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                },1500)
            } else if (error)
            {
                const details = error?.details[0].message
                handleError(details) 
            } else if (!success)
            {
                handleError(message)
            }
            console.log(result)
        }
        catch (e)
        {
            handleError(e)
        }
    }

  return (
    <div className='container'>
          <h1>Signup</h1>
          <form onSubmit={handleSignup}>
              <div>
                  <label htmlFor='name'>Name</label>
                  <input
                      onChange={handleChange}
                      type='text'
                      name='name'
                      autoFocus
                      placeholder='Enter your name'
                      value={signupInfo.name}
                  />
              </div>
              <div>
                  <label htmlFor='email'>Email</label>
                  <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      value={signupInfo.email}
                  />
              </div>
              <div>
                  <label htmlFor='password'>Password</label>
                  <input
                      onChange={handleChange}
                      type='password'
                      name='password'
                      placeholder='Enter password'
                      value={signupInfo.password}
                  />
              </div>
              <button type='submit'>Signup</button>
              <span>Already have an account ?
                  <Link to='/login'>Login</Link>
              </span>
          </form>
          <ToastContainer/>
    </div>
  )
}

export default Signup
