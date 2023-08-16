import React from 'react';
import Routers from '../../router/Routers';
import logo from '../../assets/Group 80.png'

const Layout = () => {
  return (
    <>
        {/* <div className='flex justify-between z-50 items-center px-4 sm:px-12 py-4 pt-5'> */}
          {/* <div className='sm:w-auto z-50 w-full'>
              <img src={logo}   className="sm:w-[8rem] bg-none w-[5rem] cursor-pointer" alt="logo" />
          </div> */}
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
        {/* </div> */}
      <Routers />
    </>
  );
};

export default Layout;
