import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__paragraph">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__author"> © {new Date().getFullYear()} Alex</p>
        <a
          className="footer__link"
          href="https://practicum.yandex.ru"
          rel="noreferrer"
          target="_blank"
        >
          Яндекс.Практикум
        </a>
        <a
          className="footer__link"
          href="https://github.com/alexkrasyuk24"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
      </div>
    </footer>
  )
}

export default Footer
