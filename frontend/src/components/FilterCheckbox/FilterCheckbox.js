import React from "react"
import "./FilterCheckbox.css"

function FilterCheckbox({ onFilterMovies, isShortMovies }) {
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        onChange={onFilterMovies}
        checked={isShortMovies}
        type="checkbox"
      ></input>
      <span className="filter__checkbox-title">Короткометражки</span>
    </form>
  )
}

export default FilterCheckbox
