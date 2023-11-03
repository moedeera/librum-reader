import { useEffect } from "react";
import "./CounterBlock.css";

export const CounterBlock = () => {
  const items = [
    { id: 1, name: "Stories", count: 934 },
    { id: 2, name: "Members", count: 200 },
    { id: 3, name: "Authors", count: 100 },
    { id: 4, name: "Communities", count: 50 },
  ];

  function logNumbersInOrder() {
    let currentNumber = 1;
    const maxNumber = 10;

    const intervalId = setInterval(() => {
      if (currentNumber <= maxNumber) {
        console.log(currentNumber);
        currentNumber++;
      } else {
        clearInterval(intervalId); // Stop the interval when all numbers have been logged
      }
    }, 1000); // Log every second (1000 milliseconds)
  }

  logNumbersInOrder();

  useEffect(() => {
    logNumbersInOrder();
  }, []);

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
