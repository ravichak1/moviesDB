import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import Skeleton from '../components/Skeleton/Skeleton'
function MainPage() {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])
  return (
    <div>
        {loading? <Skeleton/> : <HomePage />}
    </div>
  )
}

export default MainPage