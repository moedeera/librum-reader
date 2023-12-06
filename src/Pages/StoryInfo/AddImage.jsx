import { useState } from "react";

import { storage } from "../../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    if (image === null) return;
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      alert("Image uploaded");
    });
  };

  const handleUpload = () => {
    const uploadTask = ref(storage, `images/${image.name}`);
  };

  return (
    <div className="story-info-picture">
      <input type="file" onChange={handleChange} />
      <button className="btn" onClick={uploadImage}>
        Add Image
      </button>
      <br />
      {uploadProgress > 0 && <div>Upload is {uploadProgress}% complete</div>}
    </div>
  );
};

export default ImageUploader;
