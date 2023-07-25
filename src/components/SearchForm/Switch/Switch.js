import React, { useState } from "react";
import './Switch.css';

function Switch (props) {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" />
      <span className="switch__slider" onClick={props.onToggleClick} />
    </label>
  );
};

export default Switch;