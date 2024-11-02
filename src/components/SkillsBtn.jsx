import React, { useState } from "react";
// import { SkillsButton } from './SkillsBtnElements'

const SkillsBtn = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="button"
      tabIndex="-3"
    >
      {hover ? "SKILLS" : <button>hello</button>}
    </div>
  );
};

export default SkillsBtn;