import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navigation.css"
import account from "../../images/account-btn.svg"

function Navigation({ handleCloseMobileMenu }) {
  const setActiveMobileLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page">
      <div className="navigation__container"></div>
      <div className="navigation__mobile-menu">
        <button
          className="navigation__button-close"
          onClick={handleCloseMobileMenu}
        ></button>
        <nav className="navigation__links">
          <NavLink className={setActiveMobileLink} exact to="/">
            Главная
          </NavLink>
          <NavLink className={setActiveMobileLink} to="/movies">
            Фильмы
          </NavLink>
          <NavLink className={setActiveMobileLink} to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__button-account">
          <img src={account} alt="Кнопка аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
