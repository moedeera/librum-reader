import { useEffect, useState } from "react";
import "./DropDown.css";

export const DropDown = ({ selections, setValue, storyInfo }) => {
  const [values, setValues] = useState(["Fiction", "Sci-fi", "Fantasy"]);

  useEffect(() => {
    if (selections) {
      setValues(selections);
    }
  }, []);

  const [dropDown, showDropDown] = useState(false);
  const [selected, setSelected] = useState("Please select a Category");
  return (
    <div className="drop-down-container">
      <h4>Category</h4>
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
              setValue({ ...storyInfo, category: value });
              console.log(storyInfo);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
