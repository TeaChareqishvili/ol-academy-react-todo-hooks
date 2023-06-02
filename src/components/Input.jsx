import "./TodoStyles.scss";
import { useState } from "react";

function Input(props) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (value) {
      props.handleClick(value);
      setValue("");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="inputWrapper">
      <input
        type="text"
        placeholder="Your task is..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>Add List</button>
    </div>
  );
}

export { Input };
