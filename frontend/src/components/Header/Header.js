import React from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import "./Header.css"
import logoHeader from "../../images/logo.svg"
import account from "../../images/account-btn.svg"
import mobileMenu from "../../images/menu-button.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const [isOpened, setIsOpened] = React.useState(false)

  function handleOpenMobileMenu() {
    setIsOpened(true)
  }

  function handleCloseMobileMenu() {
    setIsOpened(false)
  }

  // Функция смены цвета активной ссылки
  const setActiveMobileLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  return (
    <>
      {!loggedIn ? (
        <header className="header">
          <Link to="/" className="logo">
            <img src={logoHeader} alt="Логотип" />
          </Link>
          <div className="header__button-wrapper">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_two">
          <Link to="/" className="logo">
            <img src={logoHeader} alt="Логотип" />
          </Link>
          <div className="header__button-wrapper-films">
            <NavLink to="/movies" className={setActiveMobileLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActiveMobileLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-wrapper">
            <Link to="/profile" className="header__button-account">
              <img
                className="header__image-account"
                src={account}
                alt="Кнопка аккаунт"
              />
            </Link>
            <button
              className="header__button-mobile"
              onClick={handleOpenMobileMenu}
            >
              <img src={mobileMenu} alt="Кнопка мобильного меню" />
            </button>
          </div>

          {isOpened ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
