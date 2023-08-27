import './Switch.css';

function Switch ({ onToggleClick, shortsActive }) {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" />
      <span className={`switch__slider ${shortsActive ? 'switch__slider_active' : ''}`} onClick={onToggleClick} />
    </label>
  );
};

export default Switch;