import React from "react";

function Techs (props) {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__description-title">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__skills">
          <h4 className="techs__skill">HTML</h4>
          <h4 className="techs__skill">CSS</h4>
          <h4 className="techs__skill">JS</h4>
          <h4 className="techs__skill">React</h4>
          <h4 className="techs__skill">Git</h4>
          <h4 className="techs__skill">Express.js</h4>
          <h4 className="techs__skill">MongoDB</h4>
        </div>
      </div>
    </section>
  );
};

export default Techs;