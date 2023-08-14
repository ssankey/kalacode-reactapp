import React from 'react'
import logo from '../../assets/Group 80.png'
const Navbar = () => {
  return (
    <div className=' flex justify-between items-center px-20 mt-10'>
      <div>
        <img
        alt='logo'
        src={logo}
        />
      </div>
      <div className='text-white'>
        POWER AT YOUR FINGERTPS
      </div>
      <div className='text-white'>
        MENU
      </div>
    </div>
  )
}

export default Navbar