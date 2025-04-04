'use client'

import React, { useEffect, useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Calendar from './Calendar'
import { useAuth } from '@/context/authContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] })

const Dashboard = () => {
  const now = new Date()

  const {currentUser, userData, setUserData, loading} = useAuth()

  const [data, setData] = useState({})

  function countValues() {
    let total_num_days = 0
    let sum_moods = 0

    for(let year in data){
      for(let month in data[year]){
        for(let day in data[year][month]){
          let days_mood = data[year][month][day]
          total_num_days++
          sum_moods += days_mood
        }  
      }
    }
    return {num_days: total_num_days, average_mood: sum_moods / total_num_days}
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()} hours : ${60 - now.getMinutes()} minutes`,
  }

  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()



    try {
      const newData = {...userData}

      if(!newData?.[year]){
        newData[year] = {}
      }

      if(!newData?.[year]?.[month]){
        newData[year][month] = {}
      }

      newData[year][month][day] = mood
      
      // update current state
      setData(newData)
      // update global state
      setUserData(newData)
      // update firebase
      
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood

          }
        }
      }, { merge: true })
    } catch (error) {
      console.log("Failed to Set Data: ", error.message)
    }
  }

  const moods = {
    '&*@#$': '😭',
    'Sad': '😢',
    'Existing': '😶',
    'Good': '😊',
    'Elated': '😍',
  }

  useEffect(() => {
    if(!currentUser || !userData){
      return 
    }
    setData(userData)
  }, [currentUser, userData])

  if(loading){
    return <Loading />
  }

  if(!currentUser){
    return <Login />
  }

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {
          Object.keys(statuses).map((status, statusIndex) => {
            return (
              <div className='flex flex-col gap-1 sm:gap-2' key={statusIndex} >
                <p className='font-medium capitalize text-sm sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                <p className={`text-base sm:text-lg truncate ${fugaz.className}`}>{statuses[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
              </div>
            )
          })
        }
      </div>

      <h4 className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}>How do you <span className='textGradient'>feel</span> today?</h4>

      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button onClick={() => {
              const currentMoodValue = moodIndex + 1
              handleSetMood(currentMoodValue)
            }} className={`flex flex-col gap-2 p-4 px-5 rounded-2xl items-center purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex-1`} key={moodIndex}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
              <p className={`text-indigo-500 text-xs sm:text-sm md:text-base ${fugaz.className}`}>{mood}</p>
            </button>
          )
        })}
      </div>
        <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  )
}

export default Dashboard