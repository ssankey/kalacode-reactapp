import React, { useState } from 'react';
import { ReactNebula } from "@flodlc/nebula";
import logo from '../assets/Group 80.png'
import { motion } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './pages.css'
import Generate from '../components/generator/Generator';
import FadeText from '../components/fading/FadingText';
import GenerateThen from '../components/generatedThen/GenerateThen';
import MyThreeJSComponent from './particles';

const Home = () => {
  const [showGenerateSection, setShowGenerateSection] = useState(true);
  const [showTextSequence, setShowTextSequence] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [generateForm, setGenerateForm] = useState(false);
  const [showGeneratedThen, setshowGeneratedThen] = useState(false)

  const handleGenerateClick = () => {
    setShowGenerateSection(false);
    setShowTextSequence(true);


    const timer = setTimeout(() => {
      setShowTextSequence(false);
      setGenerateForm(true);
    }, 13000);

    return () => clearTimeout(timer);
  };


  const generatedThen = () => {
    setShowGenerateSection(false);
    setGenerateForm(false);
    setshowGeneratedThen(true)
  }

  const handleBackButtonClick = () => {
    setShowGenerateSection(true);
    setShowTextSequence(false);
    setShowMenu(false);
    setGenerateForm(false);
    setshowGeneratedThen(false);
  };

  return (
    <div className='h-screen w-screen relative'>

      <div className='absolute inset-0'>
        <MyThreeJSComponent />
      </div>
      <div className='flex justify-between z-50 items-center px-4 sm:px-12 py-4 pt-5'>
        <div className='sm:w-auto z-50 w-full'>
          <img src={logo} className="sm:w-[8rem] bg-none w-[5rem] cursor-pointer" alt="logo" />
        </div>
        {/* <div
            className='sm:text-right text-white z-[100] cursor-pointer'
            onClick={handleMenuClick}
          >
            {showMenu ? (
              <div className="relative sm:left-6 p-5">
                <div className="corner-button-home"></div>
                <div className="corner-button-home"></div>
                <div className="corner-button-home"></div>
                <div className="corner-button-home"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-white/20 flex items-center justify-center">
                    <MdClose size={24} color="white" />
                  </div>
                </div>

              </div>
            ) : (
              'MENU'
            )}
          </div> */}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, z: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {(!showTextSequence && !showGeneratedThen && !generateForm) && (
          <div className="conditional-paragraph mt-6 px-4">
            <p className='sm:mx-auto sm:text-center pl-5 relative text-[2.2rem] sm:text-sm sm:top-[-4rem] text-white'>
              POWER AT<br className='sm:hidden' /> <span className='sm:pl-0  py-[-10rem] pl-20'>YOUR </span> <span className='sm:pl-0 pl-24 '>FINGERTIPS</span>
            </p>
          </div>
        )}

      </motion.div>
      <div className='absolute bottom-24  left-0 w-full'>
        {showGenerateSection && (
          <div className='text-white flex  flex-col items-center sm:ml-[-25rem]'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className='w-full sm:w-2/3 px-5  sm:px-0 mb-10 text-center sm:flex gap-10 z-50 sm:text-start mx-auto'>
                <div className="flex items-center justify-center sm:justify-start sm:mb-5">
                  <p className="font-bold text-white/90 mb-10">Welcome</p>
                  <div className="w-2 h-2 bg-white rounded-full mt-[-2.2rem] ml-5"></div>
                </div>

                <p className='text-[14px] text-white/70 sm:text-lg leading-[21px]'>
                  Kalacode is the only place where you can create artistic QR codes.<br /> Let’s
                  us take you to the ‘QR CODE GENERATOR PAGE’ where you can create artistic QR
                  code of your choice for free.
                </p>
              </div>
            </motion.div>
            <div className='sm:my-10  mb-10 sm:mr-[6rem] flex flex-col sm:flex-row justify-center items-center z-20 gap-3'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Link to={'/generate'}>
                  <button className='relative outline outline-offset-2 outline-gray-400/50 outline-1 bg-gray-300 text-black border text-center pl-10 pr-14 py-2 mb-8 sm:mb-3 group'
                  // onClick={handleGenerateClick}
                  >
                    <div className="corner-button-home"></div>
                    <div className="corner-button-home"></div>
                    <div className="corner-button-home"></div>
                    <div className="corner-button-home"></div>
                    <span className="button-content transition-colors  ">GENERATE NOW</span>
                    <div className='absolute top-0 left-[11.5rem] py-4  duration-500 w-12 h-full group-hover:bg-[#b6401e]/40 text-white flex justify-center items-center '><MdOutlineKeyboardArrowRight /></div>
                  </button>
                </Link>

              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Link to={'/generated-then'}>
                  <button className=' overflow-hidden btn relative button  text-white mt-[-5px] hover:bg-white/10 border text-center px-12 mb-1 py-2 sm:ml-10 transition duration-500 ease-in-out'>
                    <span className="btn-content">
                      <span className="btn-inner-content">
                        <span>Generated Then</span>
                      </span>
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

        )}
      </div>
      {/* {showTextSequence && (
       
      )} */}
      {/* {showMenu && (
        <div className="absolute sm:fixed inset-0 flex items-center justify-center z-[90] bg-black bg-opacity-80">
          <div className="flex flex-col p-8 rounded-lg">
            <button className="relative px-20 py-2 text-white border-2 border-gray-50/20 bg-transparent mb-6 sm:mb-4" onClick={handleMenuClick}>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              Our Services
            </button>
            <button className="relative px-20 py-2 text-white border-2 border-gray-50/20 bg-transparent mb-6 sm:mb-4" onClick={handleMenuClick}>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              Contact Us
            </button>
            <button className="relative px-14 py-2 text-white border-2 border-gray-50/20 bg-transparent" onClick={handleMenuClick}>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              Generated Then
            </button>
          </div>
        </div>
      )} */}

      {!generateForm && (
        <div className="absolute dotted-circles inset-0 flex items-center justify-center">
          <motion.div
            className="w-[15rem] h-[15rem] sm:w-[70rem] sm:h-[70rem] rounded-full opacity-40 border-4 border-[#b6401e] border-dotted absolute"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          ></motion.div>

          <motion.div
            className="w-[10rem] h-[10rem] sm:w-[50rem] sm:h-[50rem] rounded-full border-[#b6401e] border-4 border-dotted opacity-30 absolute"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          ></motion.div>

          <motion.div
            className="w-[7.5rem] h-[7.5rem] sm:w-[25rem] sm:h-[25rem] border-[#b6401e] rounded-full border-4 opacity-20 border-dotted absolute"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          ></motion.div>
        </div>
      )}
      {/* {generateForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className='flex items-center justify-center z-50 h-full'
        >
          <div className='flex items-center justify-center h-full'>
            <div className='w-full'>
              <Generate />
            </div>
          </div>
        </motion.div>
      )} */}


      {showGeneratedThen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className='flex items-center justify-center z-50 h-full'
        >
          <div className='flex items-center justify-center h-full'>
            <div className='w-full'>
              <GenerateThen />
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}

export default Home;
