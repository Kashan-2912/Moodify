'use client'

import React, {useEffect, useState} from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import { useAuth } from '@/context/authContext'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login } = useAuth()

  async function handleSubmit(params) {
    if(!email || !password || password.length < 6){
      return
    }

    setAuthenticating(true)
    try {
      if(isRegister){
        console.log("Signing Up a Nwe User")
        await signup(email, password)
      }
      else {
        console.log("Logging in existing User")
        await login(email, password)
      }
    } catch (error) {
        console.log(err.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>{isRegister ? 'Register' : 'Log In'}</h3>
      <p>You're one step away!</p>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='hover:border-indigo-600 focus:border-indigo-600 w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'
        placeholder='Email...'
      />
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='hover:border-indigo-600 focus:border-indigo-600 w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none' 
        placeholder='Password...'/>
      <div className='max-w-[400px] w-full mx-auto'>
          <Button text={authenticating ? 'Submitting' : 'Submit'} full clickHandler={handleSubmit} />
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-500'>
          {isRegister ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

    </div>
  )
}

export default Login