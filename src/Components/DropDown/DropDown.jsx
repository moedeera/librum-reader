import { useEffect, useState } from "react";
import "./DropDown.css";

export const DropDown = ({ selections, setValue }) => {
  const [values, setValues] = useState(["Fiction", "Sci-fi", "Fantasy"]);

  useEffect(() => {
    if (selections) {
      setValues(selections);
    }
  }, []);

  const [dropDown, showDropDown] = useState(false);
  const [selected, setSelected] = useState("Select a Category");
  return (
    <div className="drop-down-container">
      <p>
        {" "}
        <strong>Category</strong>{" "}
      </p>
      <div
        className="drop-down-list"
        style={
          dropDown
            ? { maxHeight: "none", overflow: "visible" }
            : { maxHeight: "50px", overflow: "hidden" }
        }
      >
        {" "}
        <div
          className="drop-down-item"
          onClick={() => {
            showDropDown(!dropDown);
            setSelected("Please select a Category");
          }}
        >
          {selected}
        </div>
        {values.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="drop-down-item"
            onClick={() => {
              showDropDown(false);
              setSelected(value);
              setValue(value);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
