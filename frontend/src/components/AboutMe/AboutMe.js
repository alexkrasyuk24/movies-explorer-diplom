import React from "react"
import "./AboutMe.css"
import AlexAvatar from "../../images/Alex-avatar.png"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__about-wrapper">
          <h3 className="about-me__name">Alex Krasyuk</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 29 лет</h4>
          <p className="about-me__about">
            Я родился и живу в Москве, закончил факультет экономики СГУ. Я люблю
            слушать музыку, а ещё увлекаюсь бегом. Недавно начал писать код. С
            2015 года работал в компании «СКБ Контур». После того, как прошёл
            курс по веб-разработке, начал заниматься фриланс-заказами и ушел с
            постоянной работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/alexkrasyuk24"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__avatar" src={AlexAvatar} alt="Моя аватарка" />
      </div>
    </section>
  )
}

export default AboutMe
