import React, { useState, useEffect } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header"
import { filterMovies, filterDurationFilms } from "../../utils/function"

function SavedMovies({ loggedIn, savedMovies, onDeleteCard }) {
  const [isShortMovies, setisShortMovies] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? filterDurationFilms(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  function setSearchTerm(query) {
    setSearchQuery(query)
  }

  function toggleShortFilmVisibility() {
    setisShortMovies(!isShortMovies)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={toggleShortFilmVisibility}
        setSearchTerm={setSearchTerm}
      />
      <MoviesCardList
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
