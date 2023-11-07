import { useState } from "react";

export const BasicInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Smith");
  const [tempName, setTempName] = useState(name);
  const [bio, setBio] = useState(
    "John Smith was born in 1987 and is a Lawyer from Los Angeles"
  );
  const [tempBio, setTempBio] = useState(bio);
  const [isPublic, setIsPublic] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setName(tempName);
    setBio(tempBio);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempName(name);
    setTempBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="profile-page-segment">
      {" "}
      <h4>Basic Info</h4>
      {isEditing ? (
        <div className="basic-info-segment">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder={name}
          />
          <textarea
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
            placeholder={bio}
          />
          <h4>Visibility</h4>
          <p
            onClick={() => {
              setIsPublic(!isPublic);
            }}
            style={{ cursor: "pointer" }}
          >
            <strong>Change</strong> : {isPublic ? "Public" : "Private"}
          </p>
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="bio-segment">
          <p>{name}</p>
          <p className="bio-text">{bio}</p>

          <p>Visibility: {isPublic ? "Public" : "Private"}</p>

          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
