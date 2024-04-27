import { useContext, useState } from "react";

import { SiteContext } from "../../Context/Context";
import blank from "./blank.png";

const ImageBox = ({ setError, prevImage }) => {
  const { setStoryImage } = useContext(SiteContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setImage(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
          backgroundImage: prevImage ? `url(${prevImage})` : `url(${blank})`,
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
