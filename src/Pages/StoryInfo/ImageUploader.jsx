import { useContext, useRef, useState } from "react";

import { SiteContext } from "../../Context/Context";
import blank from "./blank.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import { Loading } from "@/Components/Loading/Loading";

const ImageBox = ({ prevImage, onSave, setStory, story }) => {
  const [storyImage, setStoryImage] = useState(prevImage ? prevImage : blank);
  const fileInputRef = useRef(null);
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadImage = async () => {
    if (storyImage === null) return;
    const imageRef = ref(storage, `images/${storyImage.name}`);
    uploadBytes(imageRef, storyImage).then(async () => {
      try {
        setLoading(true);
        const url = await getDownloadURL(imageRef);
        console.log(url);
        setStory({ ...story, cover: url });
        console.log(story);
        setChangeImage(false); // Reset button label after upload
        fileInputRef.current.value = null; // Clear the file
        setUploadSuccess(true);
        console.log(story);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.size);

      // Check if file size is greater than 900KB (900 * 1024 bytes)
      if (file.size > 900 * 1024) {
        setError("Image size should not be larger than 900KB");
        setLoading(false); // Ensure loading is set to false as no loading process will occur
        return; // Prevent further execution
      }

      setLoading(true);
      setError(""); // Reset error state on a new file selection
      setStoryImage(file); // Store the file for later upload

      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryImage(reader.result);
        setImageSelected(true);
        console.log(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <Loading mini={true} />;
  }

  return (
    <div
      style={{
        height: "100%",
        minHeight: "400px",
        width: "100%",
        padding: "5px",
        minWidth: "270px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid rgba(128,128,128,0.25)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "gray", // Default background color
          backgroundImage: `url(${storyImage})`,
          backgroundPosition: "center center", // Center the background image
          backgroundSize: "cover", // Ensure the image covers the area without distorting its aspect ratio
          backgroundRepeat: "no-repeat", // Do not repeat the image
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        {loading && <span>Image loading...</span>}
      </div>
      {changeImage && (
        <div style={{ marginTop: "20px" }}>
          {}
          <input
            className="btn"
            accept="image/*"
            placeholder="Change"
            type="file"
            onChange={handleImageChange}
            style={{ marginRight: "10px" }}
            ref={fileInputRef}
          />
        </div>
      )}

      <div className="editor-button-container">
        {changeImage ? (
          !imageSelected && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setChangeImage(false);
              }}
            >
              Cancel
            </button>
          )
        ) : (
          <button
            className="btn"
            onClick={() => {
              setChangeImage(true);
            }}
          >
            Change Cover
          </button>
        )}

        {storyImage !== prevImage && (
          <>
            {" "}
            <button
              className="btn btn-green"
              onClick={() => {
                uploadImage();
              }}
            >
              Upload
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setStoryImage(prevImage);
                fileInputRef.current.value = null;
                setImageSelected(false);
              }}
            >
              Discard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageBox;
