import { useEffect, useState } from "react";
import './styles.css'

const FaceComponent = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = 95;
  const frameDuration = 90;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState([]);

  useEffect(() => {
    const preloadImages = async () => {
      const images = [];
      const totalFrames = 95; // Total number of frames including 00000 to 00085
  
      for (let i = 0; i < totalFrames; i++) {
        const imageNumber = i.toString().padStart(5, '0');
        const imageUrl = `/png/Comp 3_${imageNumber}-min.png`;
        const image = new Image();
        image.src = imageUrl;
        images.push(image);
      }
  
      await Promise.all(images.map((image) => {
        return new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
      }));
  
      setPreloadedImages(images);
      setImagesLoaded(true);
    };
  
    preloadImages();
  }, []);
  

  useEffect(() => {
    if (imagesLoaded) {
      const interval = setInterval(() => {
        setFrameIndex((prevIndex) => {
          if (prevIndex === totalFrames - 1) {
            clearInterval(interval);
            return prevIndex;
          } else {
            return (prevIndex + 1) % totalFrames;
          }
        });
      }, frameDuration);

      return () => clearInterval(interval);
    }
  }, [imagesLoaded]);

  const backgroundImage = `url(${preloadedImages[frameIndex]?.src})`;

  // Render the component only when images are loaded
  if (!imagesLoaded) {
    return null;
  }

  return (
    <div className="absolute flex justify-center items-center w-full sm:h-auto sm:w-[30%] mx-auto inset-0">
      <div
        className="absolute bg-center face-image opacity-70 -z-50 inset-0 bg-no-repeat"
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          backgroundImage,
          backgroundPosition:'center',
          backgroundSize: 'cover',
          opacity: frameIndex === 0 ? 0 : 1,
          filter: "brightness(100%)",
          transition: 'opacity 1s ease-in-out',
        }}
      ></div>
    </div>
  );
};

export default FaceComponent;
