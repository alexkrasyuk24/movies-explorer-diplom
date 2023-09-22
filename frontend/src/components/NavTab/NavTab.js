import React from "react"
import { Link } from "react-scroll"
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link className="nav-tab__link" to="about" duration={300} smooth={true}>
        О проекте
      </Link>
      <Link className="nav-tab__link" to="techs" duration={300} smooth={true}>
        Технологии
      </Link>
      <Link
        className="nav-tab__link"
        to="about-me"
        duration={300}
        smooth={true}
      >
        Студент
      </Link>
    </nav>
  )
}

export default NavTab
