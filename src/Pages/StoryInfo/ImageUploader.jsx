import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { storage } from "../../../firebase-config";
import { SiteContext } from "../../Context/Context";

const ImageBox = (onClick) => {
  const { setStoryImage, storyImage } = useContext(SiteContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setStoryImage(file); // Store the file for later upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (imageFile) => {
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      uploadBytes(storageRef, imageFile).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);

        // Optionally, get the download URL after upload
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          alert("Image saved");
        });
      });
    }
  };

  return (
    <div
      style={{
        height: "400px",
        width: "90%",
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
          height: "250px",
          width: "80%",
          backgroundColor: "gray", // Default background color
          backgroundImage: image ? `url(${image})` : "none",
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
      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          onChange={handleImageChange}
          style={{ marginRight: "10px" }}
        />
      </div>
    </div>
  );
};

export default ImageBox;
