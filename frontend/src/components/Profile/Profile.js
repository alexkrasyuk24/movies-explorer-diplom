import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Header from "../Header/Header"
import "./Profile.css"
import { EMAIL_REGEX } from "../../utils/config"
import useForm from "../hooks/useForm"

function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext)
  const [isLastValues, setIsLastValues] = useState(false)
  const { enteredValues, errors, getCheckInput, isFormValid, resetForm } =
    useForm()

  function handleEditorUserInfo(event) {
    event.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          className="profile__form"
          id="form"
          onSubmit={handleEditorUserInfo}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              value={enteredValues.name || ""}
              onChange={getCheckInput}
              type="text"
            />
            <span className="profile__error-input">{errors.name}</span>
          </label>
          <div className="profile__center-border"></div>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              name="email"
              placeholder="Email"
              onChange={getCheckInput}
              value={enteredValues.email || ""}
              pattern={EMAIL_REGEX}
              type="email"
            />
            <span className="profile__error-input">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          <button
            onClick={signOut}
            className="profile__button-exit"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
