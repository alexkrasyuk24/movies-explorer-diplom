import React from "react"
import Form from "../Form/Form"
import "../Form/Form.css"
import useForm from "../hooks/useForm"
import { EMAIL_REGEX } from "../../utils/config"

function Register({ onRegister, isLoading }) {
  const { enteredValues, errors, getCheckInput, isFormValid } = useForm()

  function handleEditorUserInfo(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      link="/signin"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      onSubmit={handleEditorUserInfo}
      isDisabledButton={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          className="form__input"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={enteredValues.name || ""}
          onChange={getCheckInput}
          type="text"
        />
        <span className="form__error-input">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          className="form__input"
          name="email"
          placeholder="Email"
          value={enteredValues.email || ""}
          onChange={getCheckInput}
          pattern={EMAIL_REGEX}
          type="email"
        />
        <span className="form__error-input">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          className="form__input"
          name="password"
          placeholder="Ваш пароль"
          minLength="6"
          maxLength="12"
          value={enteredValues.password || ""}
          onChange={getCheckInput}
          type="password"
        />
        <span className="form__error-input">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register
