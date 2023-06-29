import React, { useState, useCallback } from "react";
import {Gallery} from "react-grid-gallery";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const photos = [
  {
    src: "https://realist-web-app-bucket.s3.us-west-1.amazonaws.com/cffdjPNg5qtvUB_TXMscv.jpeg",
    // width: 4,
    // height: 3,
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
  {
    src: "https://realist-web-app-bucket.s3.us-west-1.amazonaws.com/iuPAPnzOokut8Vx1WX7ep.jpeg",
    // width: 1,
    // height: 1,
    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 212,
  },
];

Modal.setAppElement('#root');

export default function ImageGallery() {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = useCallback((index) => {
    setCurrent(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrent(0);
    setIsOpen(false);
  };


  return (
    <div>
      <Gallery
        images={photos}
        onClickThumbnail={openLightbox}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeLightbox}
        contentLabel="Image modal"
      >
        <Carousel
          showThumbs={false}
          selectedItem={current}
          infiniteLoop
        >
          {photos.map((image, index) => (
            <div key={index}>
              <img src={image.thumbnail} />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );

  // return (
  //   <div>
  //     <Gallery images={photos} onClickThumbnail={openLightbox} />
  //     <Modal 
  //       isOpen={isOpen}
  //       onRequestClose={closeLightbox}
  //       contentLabel="Image Carousel"
  //     >
  //       <Carousel 
  //         showArrows={true}
  //         showStatus={true}
  //         showThumbs={true} 
  //         // selectedItem={current}
  //         dynamicHeight={true}
  //       >
  //         {photos.map((image, index) => 
  //           <Carousel.Item key={index}>
  //             <img src={image.src} alt="" />
  //           </Carousel.Item>
  //         )}
  //         {/* {photos.map((image, index) => 
  //           <div key={index}>
  //             <img src={image.src} alt="" />
  //           </div>
  //         )} */}
  //       </Carousel>
  //     </Modal>
  //   </div>
  // );
}