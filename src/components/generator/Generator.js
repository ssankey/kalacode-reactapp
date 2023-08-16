import React, { useState, useEffect } from 'react';
import logo from '../../assets/Group 80.png'

import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import FadeText from '../fading/FadingText';
import { motion } from 'framer-motion'; // Import the necessary component
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import GenerateThen from '../generatedThen/GenerateThen';
import { ReactNebula } from '@flodlc/nebula';

const Generate = ({ imageDescription }) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [linkValue, setLinkValue] = useState('https://kalacode.com/');
  const [imageUrl, setimageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [promptValue, setPromptValue] = useState(imageDescription || 'a detailed painting of a quaint cottage in the british countryside on a summers day, clue sky background with birds flying and trees, Andreas Rocha, matte painting concept art, a detailed matte painting, detailed background, ((illustration)), (((masterpiece))), ((best quality)), (High resolution)');
  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = 'qr_code.png'; // Change the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  async function openModal(event) {
    event.preventDefault();
    const url = linkValue;
    const promptText = promptValue;

    const payload = {
      "qr_code_data": url,
      "text_prompt": promptText,
      "use_url_shortener": false,
      "negative_prompt": "ugly, disfigured, low quality, blurry, nsfw, text, words",
    };

    const apiUrl = "https://api.gooey.ai/v2/art-qr-code/?run_id=l49n5w4p&uid=RMZ2M7e255bQZhBO5XMqpXYb8zO2";

    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + "sk-LlACw9nNNFd00Uwde7QlRyN9vfgxnPz9OUeuMs2AVaMbm78w",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const result = await response.json();
        setimageUrl(result.output.output_images[0]);
        setShowForm(false); // Hide the form after image is loaded
        setShowModal(true); // Show the modal with the image
      } else {
        console.error("Error: Unable to generate QR code");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }



  function closeModal() {
    setShowModal(false);
    setimageUrl('');
    setShowForm(true);
  }

  const handleGeneratedThen = () => {
    setShowForm(false);
    setShowModal(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 13000);

    return () => clearTimeout(timer);
  }, [])


  return (
    <>
      <div className='w-screen relative h-screen'>
        <ReactNebula
          config={{
            starsCount: 1000,
            starsRotationSpeed: 3,
            nebulasIntensity: 10
          }}
          className='absolute inset-0 -z-50'
        />
        <div className='flex justify-between z-50 items-center px-4 sm:px-12 py-4 pt-5'>
          <div className='sm:w-auto z-50 w-full'>
            <Link to={'/'} >
              <img src={logo} className="sm:w-[8rem] bg-none w-[5rem] cursor-pointer" alt="logo" />
            </Link>
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
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex items-center justify-center h-full'
          >
            <div className="text-center z-50 text-black p-4">
              <FadeText />
            </div>
          </motion.div>
        )}
        <div className="flex flex-col  items-center justify-center">

          {showForm && (
            <div className="z-10 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='flex items-center justify-center h-full'
              >
              <div className="px-1 sm:p-10 sm:px-4 bg-opacity-10 w-[90%] outline outline-offset-4 outline-white/5 sm:w-full bg-black sm:pt-8 form-text relative mx-auto max-w-screen-lg">
                <div className="corner-button-generator"></div>
                <div className="corner-button-generator"></div>
                <div className="corner-button-generator"></div>
                <div className="corner-button-generator"></div>
                <h1 className="text-2xl py-5 sm:text-5xl uppercase text-center">
                  Artistic QR Code Generator
                </h1>
                <p className="sm:mt-3 sm:px-20 opacity-70 text-sm text-center sm:leading-[2rem] pb-5 px-5 leading-[1.2rem]">
                  This experience leverages ‘Artificial Intelligence’ to generate artistic QR code of your choice.<br />
                  Key in the required information below and hang in there to download!
                </p>
                <div className="sm:mt-2 p-6 pt-2 bg-transparent shadow-lg max-w-3xl mx-auto">
                  <form>
                    <div className="mb-8 sm:mb-6">
                      <label htmlFor="link" className="block text-[12px] pb-1 text-white/100 sm:text-lg">Add your link</label>
                      <input
                        id="link"
                        type="text"
                        placeholder="https://kalacode.com/"
                        className="w-full p-1 sm:mt-2 text-[12px] mb-5 bg-black border-2 border-gray-400 text-white/80 outline-none"
                        value={linkValue}
                        onChange={(e) => setLinkValue(e.target.value)}
                      />
                    </div>
                    <div className="sm:mb-2">
                      <label htmlFor="prompt" className="block pb-1 text-[12px] text-white/100 sm:text-lg">Add your prompt</label>
                      <textarea
                        id="prompt"
                        rows={5}
                        className="w-full p-1 sm:mt-2 text-[12px] bg-black mb-5 text-white/80 border-2 border-gray-400 outline-none"
                        placeholder="a detailed painting of a quaint cottage in the british countryside on a summers day, clue sky background with birds flying and trees, Andreas Rocha, matte painting concept art, a detailed matte painting, detailed background, ((illustration)), (((masterpiece))), ((best quality)), (High resolution)"
                        value={promptValue}
                        onChange={(e) => setPromptValue(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="text-center pt-5 sm:py-2 relative">
                      <button
                        className="relative px-14 py-2 text-white border-2 border-gray-50/20 bg-transparent mb-2"
                        onClick={async (event) => {
                          setShowModal(true);
                          setLoading(true);
                          await openModal(event);
                          setLoading(false);
                        }}
                      >
                        <div className="corner-button"></div>
                        <div className="corner-button"></div>
                        <div className="corner-button"></div>
                        <div className="corner-button"></div>
                        Generate Now
                      </button>
                    </div>
                  </form>
                </div>
            </div>
              </motion.div>
          </div>
            )}
        {showModal && (
          <div className="fixed inset-0 flex modal-text z-50 items-center justify-center ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} // Exit animation properties
              transition={{ duration: 0.8 }}
              className='flex items-center justify-center h-full'
            >
              <div className="w-full mt-12 max-w-7xl p-2 mx-auto rounded" id='myModal'>
                <div className="flex flex-col items-center justify-center w-full z-50 ">
                  {loading ? (
                    <div className="loader animate-spin w-12 h-12  rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  ) : (
                    <div className='bg-black  pb-5 sm:py-6  outline outline-offset-0 outline-white/5  bg-opacity-20 sm:w-[60rem] flex justify-center items-center flex-col relative'>
                      <div className="corner-border-generated"></div> {/* Top left corner border */}
                      <div className="corner-border-generated"></div> {/* Top right corner border */}
                      <div className="corner-border-generated"></div> {/* Bottom left corner border */}
                      <div className="corner-border-generated"></div> {/* Bottom right corner border */}
                      <button className="absolute  top-0 left-0 p-2 sm:m-4 text-white" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <h1 className="text-2xl text-white sm:text-5xl px-3 py-[2.5rem] sm:pb-10 uppercase  sm:pt-5  text-center">
                        YOUR ARTISTIC QR CODE <br /> IS READY
                      </h1>
                      <div className="bg-transparent bg-black">
                        <img
                          id='qrCodeImage'
                          src={imageUrl}
                          alt="qrcode"
                          className="h-64  rounded-lg w-64 bg-none"
                        />
                      </div>
                      <div className="sm:py-5 text-center">
                        <p className="text-white text-lg py-3 text-center">Share your QR Code</p>
                        <div className="flex justify-center pb-4 space-x-4">
                          <a href="#" className="text-white">
                            <FaFacebook size={16} />
                          </a>
                          <a href="#" className="text-white">
                            <FaTwitter size={16} />
                          </a>
                          <a href="#" className="text-white">
                            <FaInstagram size={16} />
                          </a>
                          <a href="#" className="text-white">
                            <FaLinkedin size={16} />
                          </a>
                        </div>
                      </div>
                      <div className="mt-2 pb-4 flex justify-center">
                        <button onClick={() => downloadImage(imageUrl)} className=" relative font-bold outline outline-offset-2 outline-gray-400/50  outline-1 text-black bg-white px-10 py-2">
                          <div className="corner-button"></div>
                          <div className="corner-button"></div>
                          <div className="corner-button"></div>
                          <div className="corner-button"></div>
                          DOWNLOAD NOW
                        </button>
                      </div>
                    </div>

                  )}
                </div>
              </div>
            </motion.div>
          </div>

        )}

        {showModal && !loading && (
          <div id='power-buttons' className="flex sm:flex-col sm:relative z-50 left-[39rem] top-[26rem]">
            <button className="relative px-12 py-2 text-white border-2 border-gray-50/20 bg-transparent mb-10 sm:mb-4" >
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              OUR SERVICES
            </button>

            <button className="relative px-12 py-2 text-white border-2 border-gray-50/20 bg-transparent" onClick={handleGeneratedThen} >
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              <div className="corner-button"></div>
              GENERATED THEN
            </button>
          </div>
        )}

        {/* 
      {!showForm && !showModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} // Exit animation properties
          transition={{ duration: 0.6 }}
          className='flex items-center justify-center h-full'
        >
          <div className="text-center z-50 text-black p-4">
            <FadeText />
          </div>
        </motion.div>
      )} */}

        {!showForm && !showModal && (
          <div className='relative mt-[15rem]'>
            <GenerateThen />
          </div>
        )}

      </div>
    </div >
    </>
  );
};

export default Generate;
