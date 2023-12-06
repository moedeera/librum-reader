import { useContext, useRef, useState } from "react";

import { storage } from "../../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SiteContext } from "../../Context/Context";

const ImageUploader = () => {
  const { story, setStory } = useContext(SiteContext);
  const [image, setImage] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Select Image");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(false);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      setButtonLabel("Save Image");

      let x = URL.createObjectURL(e.target.files[0]);
      setImagePreviewUrl(x);
      console.log(x);
    }
  };

  const uploadImage = async () => {
    if (image === null) return;
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then(async () => {
      try {
        const url = await getDownloadURL(imageRef);
        setStory({ ...story, picture: url });
        setButtonLabel("Select Image"); // Reset button label after upload
        setFile(null); // Clear the file
        alert(`Image uploaded : ${url}`);
        console.log(story);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleButtonClick = () => {
    if (!file) {
      // If no file is selected, open file input
      fileInputRef.current.click();
    } else {
      // If file is selected, proceed to handle upload
      uploadImage();
    }
  };

  return (
    <div
      className="story-info-picture"
      //   style={
      //     imagePreviewUrl && { backgroundImage: `url("${imagePreviewUrl}")` }
      //   }
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <small> {file && file.name}</small>
      <button className="btn" onClick={handleButtonClick}>
        {buttonLabel}
      </button>
      <br />
      {uploadProgress > 0 && <div>Upload is {uploadProgress}% complete</div>}
    </div>
  );
};

export default ImageUploader;
