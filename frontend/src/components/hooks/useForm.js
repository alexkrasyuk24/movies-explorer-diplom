import { useState, useCallback } from "react"

// Хук useForm для управления состояниями форм
const useForm = () => {
  const [errors, setErrors] = useState({})
  const [enteredValues, setEnteredInputValues] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const getCheckInput = (event) => {
    const name = event.target.name
    const value = event.target.value

    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredInputValues(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setEnteredInputValues, setErrors, setIsFormValid]
  )
  return {
    enteredValues,
    getCheckInput,
    isFormValid,
    errors,
    resetForm,
  }
}

export default useForm
