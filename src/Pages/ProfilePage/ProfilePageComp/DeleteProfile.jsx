import { useState } from "react";

export const DeleteProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleYesClick = () => {
    // Add your logic for deleting the account here
    setIsModalOpen(false);
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile-page-segment">
      <h4>Delete Account</h4>
      <div className="btn btn-primary" onClick={handleDeleteClick}>
        Delete
      </div>
      {isModalOpen && (
        <div className="yn-modal">
          <div className="modal-content">
            <h4>Are you sure?</h4>
            <div className="buttons-container">
              {" "}
              <button className="btn btn-primary" onClick={handleYesClick}>
                Yes
              </button>
              <button className="btn btn-primary" onClick={handleNoClick}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
