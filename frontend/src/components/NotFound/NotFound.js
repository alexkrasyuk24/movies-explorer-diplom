import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  const path = useNavigate()

  function goToPath() {
    path(-2)
  }

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button onClick={goToPath} className="not-found__button">
        Назад
      </button>
    </section>
  )
}

export default NotFound
