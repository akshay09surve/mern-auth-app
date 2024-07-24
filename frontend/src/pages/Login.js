import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import {toast, ToastContainer} from 'react-toastify'

function Login() {

    const navigate = useNavigate()

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo }
        copyLoginInfo[name] = value
        setLoginInfo(copyLoginInfo)
    }

    console.log(`Login info : `,loginInfo)

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo
        if (!email || !password)
        {
            handleError('Please enter email & password.')
        }
        try
        {
            const url = 'http://localhost:8080/auth/login'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json()
            const { success, message, email, jwtToken, name, error } = result
            if (success)
            {
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('email', email)
                localStorage.setItem('name', name)
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/home')
                },1000)

            } else if (error)
            {
                const details = error?.details[0].message
                handleError(details)
            } else if (success === false)
            {
                handleError(message)
            }
            console.log(result)
        }
        catch (error)
        {
            handleError(error)
        }
    }


  return (
    <div className='container'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
              <div>
                  <label htmlFor='email'>Email</label>
                  <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      value={loginInfo.email}
                  />
              </div>
              <div>
                  <label htmlFor='password'>Password</label>
                  <input
                      onChange={handleChange}
                      type='password'
                      name='password'
                      placeholder='Enter password'
                      value={loginInfo.password}
                  />
              </div>
              <button type='submit'>Login</button>
              <span>Dont have an account ?
                  <Link to='/signup'>Signup</Link>
              </span>
          </form>
          <ToastContainer/>
    </div>
  )
}

export default Login
