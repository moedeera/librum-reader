import "./CounterBlock.css";

export const CounterBlock = () => {
  const items = [
    { id: 1, name: "Stories", count: 934 },
    { id: 2, name: "Members", count: 200 },
    { id: 3, name: "Authors", count: 100 },
    { id: 4, name: "Communities", count: 50 },
  ];

  return (
    <div className="counter-segment">
      {items.map((item) => (
        <div className="count" key={item.id}>
          <div className="count-number">
            <h3>{item.count}+</h3>
          </div>
          <div className="count-item">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
