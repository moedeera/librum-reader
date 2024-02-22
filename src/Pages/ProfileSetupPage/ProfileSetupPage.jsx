import "./ProfileSetupPage.css";

export const ProfileSetupPage = () => {
  return (
    <div className="container profile-setup-page">
      <h3>Profile Setup</h3>
      <h4>Select your favorite genre to read or write</h4>
      <div className="preference-category-container">
        <div className="preferred-category-selection">Fiction</div>
        <div className="preferred-category-selection">Non-Fiction</div>
        <div className="preferred-category-selection">Essays</div>
        <div className="preferred-category-selection">Fantasy</div>
        <div className="preferred-category-selection">Romance</div>
        <div className="preferred-category-selection">Mystery</div>
      </div>
    </div>
  );
};
