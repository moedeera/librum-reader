import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../../Context/Context";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { AuthContext } from "@/Context/AuthContext";
import { Loading } from "@/Components/Loading/Loading";

// eslint-disable-next-line react/prop-types
export const BasicInfo = () => {
  //   const { updateProfile, profileInfo, setProfileInfo } =
  //     useContext(SiteContext);
  const { fetchProfile, updateUserProfile } = useProfile();
  const { user } = useContext(AuthContext);

  //     const profile = profileInfo;
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name);
  const [tempName, setTempName] = useState(profile?.name);
  const [bio, setBio] = useState(profile?.bio);
  const [tempBio, setTempBio] = useState(profile?.bio);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);

      try {
        const data = await fetchProfile();
        setProfile(data);
        setName(data.name);
        setBio(data.bio);
        setTempName(data.name);
        setTempBio(data.bio);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [user]);

  const handleSaveClick = async () => {
    setName(tempName);
    setBio(tempBio);

    setIsEditing(false);
    // eslint-disable-next-line react/prop-types
    if (profile.displayName !== tempName) {
      // eslint-disable-next-line react/prop-types
      try {
        await updateUserProfile(profile.userId, "name", tempName);
        setProfile({ ...profile, name: tempName });
        setNameError([]);
      } catch (error) {
        setNameError(error);
      }
    }
    // eslint-disable-next-line react/prop-types
    if (profile.bio !== tempBio) {
      // eslint-disable-next-line react/prop-types

      try {
        await updateUserProfile(profile.userId, "bio", tempBio);
        setProfile({ ...profile, bio: tempBio });
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

  if (loading) {
    return <Loading />;
  }

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
          {/* <h4>Visibility</h4>
          <p
            onClick={() => {
              setIsPublic(!isPublic);
            }}
            style={{ cursor: "pointer" }}
          >
            <strong>Change</strong> : {isPublic ? "Public" : "Private"}
          </p> */}
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

          {/* <p>Visibility: {profile?.public ? "Public" : "Private"}</p> */}

          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
