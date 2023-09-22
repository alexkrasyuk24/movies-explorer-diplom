import React, { useEffect, useState } from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import { useLocation } from "react-router-dom"
import Preloader from "../Preloader/Preloader"
import "./MoviesCardList.css"
import {
  NUMBER_OF_MOVIES_DESKTOP,
  TABLET_ITEMS_PER_PAGE,
  MOBILE_ITEMS_PER_PAGE,
} from "../../utils/config"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const { pathname } = useLocation()
  const [shownMovies, setShownMovies] = useState(0)

  function setCounterCardsMoviesDisplay() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(12)
    } else if (display >= 1024) {
      setShownMovies(12)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  function setShowMoviesCounter() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(shownMovies + NUMBER_OF_MOVIES_DESKTOP)
    } else if (display >= 1024) {
      setShownMovies(shownMovies + NUMBER_OF_MOVIES_DESKTOP)
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_ITEMS_PER_PAGE)
    } else {
      setShownMovies(shownMovies + MOBILE_ITEMS_PER_PAGE)
    }
  }

  function findSavedMovieById(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  useEffect(() => {
    setCounterCardsMoviesDisplay()
  }, [cards])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", setCounterCardsMoviesDisplay)
    }, 500)
  })

  return (
    <section className="films">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieById(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__button-wrapper"></div>
            </>
          ) : (
            <>
              <ul className="films__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieById(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__button-wrapper">
                {cards.length > shownMovies ? (
                  <button
                    className="films__button"
                    onClick={setShowMoviesCounter}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
