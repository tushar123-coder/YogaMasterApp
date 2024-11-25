import React from 'react'
import BannerContainer from './Hero/BannerContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import Follower from './Follower'
import useAuth from '../../hooks/useAuth'

function Home() {
  
  return (
    <section>
      <BannerContainer/>
      <div className='max-w-screen-xl mx-auto'>
      <Gallery/>
      <PopularClasses/>
      <PopularTeacher/>
      </div>
      <Follower/>
    </section>
  )
}

export default Home
