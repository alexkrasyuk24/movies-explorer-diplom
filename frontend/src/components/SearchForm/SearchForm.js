import React, { useState, useEffect } from "react"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"

function SearchForm({ setSearchTerm, onFilterMovies, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false)
  const [query, setQuery] = useState("")
  const location = useLocation()

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function handleEditorUserInfo(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      setSearchTerm(query)
    }
  }

  function updateQueryValue(event) {
    setQuery(event.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={handleEditorUserInfo}>
        <input
          className="search__input"
          name="query"
          placeholder="Фильм"
          value={query || ""}
          onChange={updateQueryValue}
          type="text"
        ></input>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox
        onFilterMovies={onFilterMovies}
        isShortMovies={isShortMovies}
      />

      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}

      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
