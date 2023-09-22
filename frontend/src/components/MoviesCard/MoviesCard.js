import React from "react"
import "./MoviesCard.css"
import { durationConverterFilms } from "../../utils/function"

function MoviesCard({
  card,
  saved,
  savedMovies,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
}) {
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function onDelete() {
    onDeleteCard(card)
  }

  const cardLikeButtonClassName = `${
    saved ? "film__button-like film__button-like_active" : "film__button-like"
  }`

  return (
    <>
      <li className="film" key={card.id}>
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="film__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>
        <div className="film__wrapper">
          <div className="film__title-wrapper">
            <h2 className="film__title">{card.nameRU}</h2>
            <span className="film__time">
              {durationConverterFilms(card.duration)}
            </span>
          </div>
          {isSavedFilms ? (
            <button
              type="button"
              className="film__delete-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
