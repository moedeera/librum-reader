import "./Block6.css";

export const Block6 = () => {
  const promo = ["Science", "Biographies", "Essays", "Short-Stories"];
  return (
    <div className="block-6-container">
      <div className="block-6-segments-container">
        {promo.map((item, index) => (
          <div key={index} className="block-6-segment">
            <img src="" alt="" />
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
