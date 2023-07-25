import React, { useState } from "react";
import Header from "../Header/Header";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";

function Main (props) {
  const [isHeaderDark, setHeaderDark] = useState(false);
  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        loggedIn={props.loggedIn}
      />
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default Main;