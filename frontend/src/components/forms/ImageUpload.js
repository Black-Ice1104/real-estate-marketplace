import axios from "axios";
import Resizer from "react-image-file-resizer";
import {Avatar} from "antd";

export default function ImageUpload({ ad, setAd }) {
    const handleUpload = async (e) => {
      try{
        let files = e.target.files;
        files = [...files];
        if (files?.length) {
        //   console.log(files);
          setAd({ ...ad, uploading: true });
          files.map((f) => {
            // upload
            new Promise((resolve) => {
              Resizer.imageFileResizer(
                f,
                1080,
                720,
                "JPEG",
                100,
                0,
                async (uri) => {
                  try {
                    // console.log("UPLOAD URI =>", uri);
                    const { data } = await axios.post("/upload-image", {
                      image: uri,
                    });
                    setAd((prev) => ({
                      ...prev,
                      photos: [data, ...prev.photos],
                      uploading: false,
                    }));
                  } catch (err) {
                    console.log("photo upload err => ", err);
                    setAd({ ...ad, uploading: false });
                  }
                },
                "base64"
              );
            });
          });
        }
      } catch (err) {
        setAd({ ...ad, uploading: false });
      }
    };
  
    const handleDelete = async (file) => {
        const answer = window.confirm("Delete image?");
        if (!answer) return;
        setAd({ ...ad, uploading: true });
        try {
          const { data } = await axios.post("/remove-image", file);
          if (data?.ok) {
            setAd((prev) => ({
              ...prev,
              photos: prev.photos.filter((p) => p.Key !== file.Key),
              uploading: false,
            }));
          }
        } catch (err) {
          console.log(err);
          setAd({ ...ad, uploading: false });
        }
      };

    return (
      <>
        {/* <div className="d-flex mt-4"> */}
          <label className="btn btn-secondary mt-4">
            {ad.uploading ? "Processing..." : "Upload photos"}
            <input
              onChange={handleUpload}
              type="file"
              accept="image/*"
              multiple
              hidden
              disabled={ad.uploading}
            />
          </label>
        {/* </div> */}

        {ad.photos?.map((file, index) => (
          <Avatar
            key={index}
            src={file?.Location}
            shape="square"
            size={80}
            className="ml-2 mb-4"
            onClick={() => handleDelete(file)}
          />
        ))}
      </>
    );
  }