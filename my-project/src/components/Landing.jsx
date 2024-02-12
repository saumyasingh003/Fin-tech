import React from 'react'
import image from '../assets/landing.gif'
const Landing = () => {
  return (
   <div className='flex md:flex-row flex-col justify-center relative lg:ml-80 max-[768px]:right-9'> 
   <div className=' '>

   <h1 className='relative items-center lg:top-32 text-4xl font-bold hover:tracking-wider hover:cursor-pointer transation-all delay-150 ease-in-out'>The Ultimate <br/>solution for <br/> your expenses..</h1>
   </div>
    <img src={image} alt ="" className='relative lg:bottom-20'/>
   </div> 
  )
}

export default Landing