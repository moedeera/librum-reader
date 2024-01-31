import { useContext, useState } from "react";
import { SiteContext } from "../../../Context/Context";

// eslint-disable-next-line react/prop-types
export const BasicInfo = () => {
  const { updateProfile, profileInfo, setProfileInfo } =
    useContext(SiteContext);
  const profile = profileInfo;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.profileName);
  const [tempName, setTempName] = useState(profile.profileName);
  const [bio, setBio] = useState(profile.bio);
  const [tempBio, setTempBio] = useState(profile.bio);
  const [isPublic, setIsPublic] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setName(tempName);
    setBio(tempBio);
    setIsEditing(false);
    // eslint-disable-next-line react/prop-types
    if (profile.profileName !== tempName) {
      // eslint-disable-next-line react/prop-types
      try {
        await updateProfile(profile.profile_Id, "profileName", tempName);
        setProfileInfo({ ...profileInfo, profileName: tempName });
        setNameError([]);
      } catch (error) {
        setNameError(error);
      }
    }
    // eslint-disable-next-line react/prop-types
    if (profile.bio !== tempBio) {
      // eslint-disable-next-line react/prop-types

      try {
        await updateProfile(profile.profile_Id, "bio", tempBio);
        setProfileInfo({ ...profileInfo, bio: tempBio });
        setBioError([]);
      } catch (error) {
        setBioError(error);
      }
    }
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

          <p>Visibility: {profile?.public ? "Public" : "Private"}</p>

          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
