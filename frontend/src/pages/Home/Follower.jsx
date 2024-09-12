import React from 'react'

function Follower() {
  return (
    <div>
      <div className='max-w-full bg-blue-800 h-[200px] text-white flex flex-row justify-center items-center gap-8'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>35M+</h1>
            <p className='text-sm'>Visitor</p>
        </div>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>5M+</h1>
            <p className='text-sm' >Subscriber</p>
        </div>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>950k+</h1>
            <p className='text-sm' >Students</p>
        </div>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>90%</h1>
            <p className='text-sm'>Success stories</p>
        </div>
        
      </div>
    </div>
  )
}

export default Follower
