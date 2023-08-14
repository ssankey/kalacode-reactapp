import React from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
const Footer = () => {
    return (
        <div className='text-white flex flex-col '>
            <div>

                <p className='w-3/5 flex ml-40 py-10'>
                    <p className='font-bold w-fit pr-10'>WELCOME</p>
                    Kalacode is the only place where you can create artistic QR codes. Let’s
                    us take you to the ‘QR CODE GENERATOR PAGE’ where you can create artistic QR
                    code of your choice for free.
                </p>
            </div>
            <div className='ml-[17rem] my-10  '>
                <button className='relative border text-center border-3 pl-12 pr-16 py-3'>
                    GENERATE NOW
                    <div className='absolute top-0 left-[11.6rem] w-10 h-full bg-gradient-to-tr from-sky-500 border-t-violet-700 flex justify-center items-center '><MdOutlineKeyboardArrowRight /></div>
                </button>
               
                <button className='relative border text-center border-3 ml-10 px-12 py-3'>
                    GENERATED THEN
                </button>
            </div>
        </div>
    )
}

export default Footer