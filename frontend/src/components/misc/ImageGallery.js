import "photoswipe/dist/photoswipe.css";
// import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
// import "../../index.css";

// main page shows thumbnail
// if click it, shows logical src in the air
// finally, shows original when expanded


const photos = [
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


export default function ImageGallery() {
    // if image num < 3, put them in the center; otherwise, put them left-align
    const imageClass = photos.length < 3 ? "center-align" : "left-align";

    return (
        <div className={`gallery-container ${imageClass}`}>
        {/* <div className="gallery-container"> */}
            <Gallery>
                {photos.map((photo, index) => (
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
//                 original={photos[0].src}
//                 thumbnail={photos[0].src}
//                 width={photos[0].width}
//                 height={photos[0].height}
//             >
//                 {({ ref, open }) => (
//                     <img
//                         ref={ref}
//                         onClick={open}
//                         src={photos[0].src}
//                         width={photos[0].thumbnailWidth}
//                         height={photos[0].thumbnailHeight}
//                     />
//                 )}
//             </Item>
//             <Item
//                 original={photos[1].src}
//                 thumbnail={photos[1].src}
//                 width={photos[1].width}
//                 height={photos[1].height}
//             >
//                 {({ ref, open }) => (
//                     <img
//                         ref={ref}
//                         onClick={open}
//                         src={photos[1].src}
//                         width={photos[1].thumbnailWidth}
//                         height={photos[1].thumbnailHeight}
//                     />
//                 )}
//             </Item>
//         </Gallery>
//     );
// }