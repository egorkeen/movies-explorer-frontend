import React, { useState } from "react";
import Header from '../Header/Header';

function Profile (props) {
  const [name, setName] = useState(props.currentUser.name);
  const [email, setEmail] = useState(props.currentUser.email);
  const [isHeaderDark, setHeaderDark] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmitChanges = (e) => {
    e.preventDefault();
    props.onSubmit({
      name: name,
      email: email
    });
  }

  return (
    <div className="page">
      <Header
        isHeaderDark={isHeaderDark}
        onBurgerMenuClick={props.onBurgerMenuClick} 
        loggedIn={props.loggedIn}
      />
      <section className="profile">
        <h1 className="profile__title">Привет, {props.currentUser.name}</h1>
        <div className="profile__data">
          <div className="profile__container">
            <h2 className="profile__data-name">Имя</h2>
            <input className="profile__input" type="text" onChange={handleNameChange} value={name} />
          </div>
          <div className="profile__container">
            <h2 className="profile__data-name">E-mail</h2>
            <input className="profile__input" type="email" onChange={handleEmailChange} value={email} />
          </div>
        </div>
        <button onClick={handleSubmitChanges} type="submit" className="profile__submit-button">Редактировать</button>
        <button className="profile__sign-out-button" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </section>
    </div>
  );
};

export default Profile;