import { useContext, useEffect, useRef, useState } from "react";

import blank from "./blank.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import { Loading } from "@/Components/Loading/Loading";
import { useDraft } from "@/utils/custom-hooks/useDraft";

import { useAccount } from "@/utils/custom-hooks/useAccount";

const ImageBox = ({ prevImage, onSave, setStory, story, id }) => {
  const { updateDraft, deleteImage } = useDraft();
  const { fetchAccount, updateAccount } = useAccount();

  const [storyImage, setStoryImage] = useState(null);
  const fileInputRef = useRef(null);
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setStoryImage(prevImage ? prevImage : blank);
  }, [prevImage]);

  useEffect(() => {
    if (uploadSuccess === false) {
      return;
    }
    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  }, [uploadSuccess]);

  const uploadImage = async () => {
    if (!storyImage) return;
    setLoading(true);
    const imageRef = ref(storage, `images/${storyImage.name}`);

    try {
      await uploadBytes(imageRef, storyImage);
      const url = await getDownloadURL(imageRef);
      console.log("successfully uploaded image", url);
      await updateDraft(id, { cover: url });
      const account = await fetchAccount();
      const updatedAccount = {
        ...account,
        drafts: account.drafts.map((draft) =>
          draft.draftId === id ? { ...draft, cover: url } : draft
        ),
      };
      await updateAccount(story?.userId, "drafts", updatedAccount.drafts);
      // await deleteImage(story?.cover);
      setStory({ ...story, cover: url });
      setChangeImage(false);
      setUploadSuccess(true);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the file input if necessary
    } catch (error) {
      setError("Failed to upload image: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.name);
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
        setPreviewImage(reader.result);
        setImageSelected(true);
        // console.log(reader.result);
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
          backgroundImage: `url(${previewImage ? previewImage : storyImage})`,
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
            className={uploadSuccess ? "btn btn-green" : "btn"}
            onClick={() => {
              if (uploadSuccess) {
                return;
              }
              setChangeImage(true);
            }}
          >
            {uploadSuccess ? "Successfully Uploaded " : "Change Cover"}
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
                setPreviewImage(null);
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
