import { useState, useEffect } from "react";
import "./CounterBlock.css";

export const CounterBlock = () => {
  const items = [
    { id: 1, name: "Stories", count: 934 },
    { id: 2, name: "Members", count: 200 },
    { id: 3, name: "Authors", count: 140 },
    { id: 4, name: "Communities", count: 50 },
  ];

  const [counts, setCounts] = useState(
    items.map((item) => ({ ...item, currentCount: item.count - 40 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((currentCounts) =>
        currentCounts.map((count) => {
          if (count.currentCount < count.count) {
            return { ...count, currentCount: count.currentCount + 1 };
          }
          return count;
        })
      );
    }, 3000 / 40); // Divides the total time by 40 to determine how often to increment

    // Clear the interval when component unmounts or all counts have reached their target
    const allCountsDone = counts.every(
      (count) => count.currentCount >= count.count
    );
    if (allCountsDone) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [counts]); // Depend on counts to re-evaluate when they change

  return (
    <div className="counter-segment">
      {counts.map((item) => (
        <div className="count" key={item.id}>
          <div className="count-number">
            <h3>{item.currentCount}+</h3>
          </div>
          <div className="count-item">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
