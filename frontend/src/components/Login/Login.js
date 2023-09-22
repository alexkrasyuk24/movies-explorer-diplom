import React from "react"
import Form from "../Form/Form"
import "../Form/Form.css"
import { EMAIL_REGEX } from "../../utils/config"
import useForm from "../hooks/useForm"

function Login({ onAuthorization, isLoading }) {
  // Хук useForm()
  const { enteredValues, errors, getCheckInput, isFormValid } = useForm()

  function handleEditorUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      link="/signup"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      onSubmit={handleEditorUserInfo}
      isDisabledButton={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        E-mail
        <input
          className="form__input"
          name="email"
          placeholder="Email"
          type="email"
          onChange={getCheckInput}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ""}
          required
        />
        <span className="form__error-input">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          className="form__input"
          name="password"
          placeholder="пароль"
          type="password"
          onChange={getCheckInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
          required
        />
        <span className="form__error-input">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
