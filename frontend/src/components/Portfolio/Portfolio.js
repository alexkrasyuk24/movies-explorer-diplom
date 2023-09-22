import React from "react"
import arrowUp from "../../images/arrow.svg"
import "./Portfolio.css"

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://alexkrasyuk24.github.io/mesto/index.html"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Статичный сайт</p>
          <img
            className="portfolio__up-arrow"
            src={arrowUp}
            alt="Стрелка вверх"
          />
        </a>
        <a
          href="https://alexkrasyuk24.github.io/russian-travel/index.html"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Адаптивный сайт</p>
          <img
            className="portfolio__up-arrow"
            src={arrowUp}
            alt="Стрелка вверх"
          />
        </a>
        <a
          href="https://alexkrasyuk24.github.io/mesto/index.html"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__text">Одностраничное приложение</p>
          <img
            className="portfolio__up-arrow"
            src={arrowUp}
            alt="Стрелка вверх"
          />
        </a>
      </nav>
    </section>
  )
}

export default Portfolio
