import "photoswipe/dist/photoswipe.css";
// import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useState, useEffect } from 'react';
// import "../../index.css";

// main page shows thumbnail
// if click it, shows logical src in the air
// finally, shows original when expanded

const defaultPhotos = [
    {
      src: "https://realist-web-app-bucket.s3.us-west-1.amazonaws.com/cffdjPNg5qtvUB_TXMscv.jpeg",
      thumbnail: "https://realist-web-app-bucket.s3.us-west-1.amazonaws.com/cffdjPNg5qtvUB_TXMscv.jpeg",
      width: 1024,
      height: 768,
      thumbnailWidth: 256,
      thumbnailHeight: 192,
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      width: 1024,
      height: 768,
      thumbnailWidth: 256,
      thumbnailHeight: 192,
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 1024,
        height: 768,
        thumbnailWidth: 256,
        thumbnailHeight: 192,
      },
];



export default function ImageGallery({ ad }) {
    // if image num < 3, put them in the center; otherwise, put them left-align
    const imageClass = ad?.photos?.length < 3 ? "center-align" : "left-align";
    const [photoArray, setPhotoArray] = useState([{}]);

    /* 
        Issue related to the async nature of the state updates in React:
        the state update operation is async -> the component (useEffect) may render before the state update (ad data loaded) is complete

        So if [ad] changes to [] instead in the useEffect, then the generatePhotoArray() may be performed before the ad data actually get loaded, so the ad?.photos?.length is still undefined, resulting in the default photos being displayed initially.
    */ 
    useEffect(() => {
        generatePhotoArray();
    }, [ad]); 

    const generatePhotoArray = () => {
        console.log("ImageGallery: ad?.photos.length=", ad?.photos?.length);

        if(ad?.photos?.length > 0){
            console.log("ad?.photos.length > 0")
            const x = ad?.photos?.length === 1 ? 2 : 4;
            let array = []
            ad?.photos?.map((p) => 
            array.push({
                    src: p.Location,
                    thumbnail: p.Location,
                    // width: x,
                    // height: x,
                    width: 1024,
                    height: 768,
            }));
            setPhotoArray(array)
        // }
        } else {
            console.log("ad?.photos.length == 0")
            setPhotoArray(defaultPhotos)
        }
    }

    return (
        <div className={`gallery-container ${imageClass}`}>
            <Gallery>
                {/* {setLayout(true)} */}
                {photoArray?.map((photo, index) => (
                    <Item
                        key={index}
                        original={photo.src}
                        thumbnail={photo.thumbnail}
                        width={photo.width}
                        height={photo.height}
                    >
                        {({ ref, open }) => (
                            <img
                                ref={ref}
                                onClick={open}
                                src={photo.src}
                            />
                        )}
                    </Item>
                ))}
            </Gallery>
        </div>
    );
}


// export default function ImageGallery() {
//     return (
//         <Gallery>
//             <Item
//                 original={ad?.photos[0].src}
//                 thumbnail={ad?.photos[0].src}
//                 width={ad?.photos[0].width}
//                 height={ad?.photos[0].height}
//             >
//                 {({ ref, open }) => (
//                     <img
//                         ref={ref}
//                         onClick={open}
//                         src={ad?.photos[0].src}
//                         width={ad?.photos[0].thumbnailWidth}
//                         height={ad?.photos[0].thumbnailHeight}
//                     />
//                 )}
//             </Item>
//             <Item
//                 original={ad?.photos[1].src}
//                 thumbnail={ad?.photos[1].src}
//                 width={ad?.photos[1].width}
//                 height={ad?.photos[1].height}
//             >
//                 {({ ref, open }) => (
//                     <img
//                         ref={ref}
//                         onClick={open}
//                         src={ad?.photos[1].src}
//                         width={ad?.photos[1].thumbnailWidth}
//                         height={ad?.photos[1].thumbnailHeight}
//                     />
//                 )}
//             </Item>
//         </Gallery>
//     );
// }