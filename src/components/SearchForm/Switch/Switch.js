import React, { useState } from "react";
import './Switch.css';

function Switch (props) {
  const [toggle, setToggle] = useState(false);

  const handleToggleClick = () => {
    setToggle(!toggle);
    console.log(toggle);
    // здесь мы в дальнейшем опишем логику этого включателя
  }

  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" />
      <span className="switch__slider" onClick={handleToggleClick} />
    </label>
  );
};

export default Switch;