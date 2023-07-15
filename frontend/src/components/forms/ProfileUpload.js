import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ImageUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  // context
  const [auth, setAuth] = useAuth();

  const handleUpload = (e) => {
    let file = e.target.files[0]; // let is a local var
    if (file) {
      setUploading(true);
      // upload
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1080,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              const { data } = await axios.post("/upload-image", {
                image: uri,
              });
              setPhoto(data);
              setUploading(false);
            } catch (err) {
              console.log("photo upload err => ", err);
              setUploading(false);
            }
          },
          "base64"
        );
      });
    } else {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="d-flex mt-4">
        <label className="btn btn-secondary mr-1 mt-4 mb-4">
          {uploading ? "Processing..." : "Upload photos"}
          <input
            onChange={handleUpload}
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
          />
        </label>

        {photo?.Location ? (
          <Avatar
            src={photo?.Location}
            shape="square"
            size={46}
            className="mx-2 mb-4 mt-4"
            onClick={() => handleDelete()}
          />
        ) : (
          ""
        )}

        {/* <pre>{JSON.stringify(photo, null, 4)}</pre> */}
      </div>
    </>
  );
}