import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <Link to='/collection'>
    <div className='flex flex-col sm:flex-row border border-gray-500' >
      {/* Hero Left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0' >
        <div className='text-[#414141]' >
            <div className='flex items-center gap-2' >
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base' >OUR BESTSELLER</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed' >Latest Arrivals</h1>
            <div className='flex items-center gap-2' >
                <p className='font-semibold text-sm md:text-base' >SHOP NOW</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img src={assets.hero1} className='w-full sm:w-1/2' alt="" />
    </div>
    </Link>
  )
}

export default Hero
