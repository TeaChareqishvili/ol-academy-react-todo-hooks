import "./TodoStyles.scss";
import { useState } from "react";
function Input({ handleClick }) {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick(value);
      setValue("");
    }
  };

  const handleClickButton = () => {
    if (value) {
      handleClick(value);
      setValue("");
    }
  };

  return (
    <div className="inputWrapper">
      <input
        type="text"
        placeholder="Your task is..."
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClickButton}>Add List</button>
    </div>
  );
}

export { Input };
