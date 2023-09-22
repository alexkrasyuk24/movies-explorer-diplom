import React, { useState, useEffect } from "react"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import InfoTooltip from "../InfoToolTip/InfoToolTip"
import InfoTooltipUpdate from "../InfoToolTipUpdate/InfoToolTipUpdate"
import NotFound from "../NotFound/NotFound"
import * as api from "../../utils/MainApi"
import "./App.css"

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])

  const [isUpdate, setIsUpdate] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleRegisterSubmit({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleLoginSubmit({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
  }

  // ЛОГИН ПОЛЬЗОВАТЕЛЯ
  function handleLoginSubmit({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // OТРИСОВКА ДАННЫХ ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЗАРЕГИСТРИРОВАН
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getProfileUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsData) => {
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  function handleEditUserInfo(newUserInfo) {
    setIsLoading(true)
    api
      .editProfileUserInfo(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(err)
        handleAuthorizedErrorInfo(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // ЛАЙК КАРТОЧКИ С ФИЛЬМОМ
  function handleCardLikeMovie(card) {
    api
      .addNewCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleAuthorizedErrorInfo(err)
      })
  }

  // УДАЛЕНИЕ КАРТОЧКИ С СОХРАНЕННЫМ ФИЛЬМОМ
  function handleCardDislikeMovie(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleAuthorizedErrorInfo(err)
      })
  }

  // ОШИБКА АВТОРИЗАЦИИ
  function handleAuthorizedErrorInfo(err) {
    if (err === "Error: 401") {
      handleSignOut()
    }
  }

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  // ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  // ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ ПО OVERLAY
  function closeByOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  useEffect(() => {
    function closeByEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscapePopups)
      return () => {
        document.removeEventListener("keydown", closeByEscapePopups)
      }
    }
  }, [isOpen])

  // УДАЛЕНИЕ СОХРАНЕНЫХ ДАННЫХ ПРИ ВЫХОДЕ ИЗ ПРИЛОЖЕНИЯ И ЧИСТКА ЛОКАЛЬНОГО ХРАНИЛИЩА
  const handleSignOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("movies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("movieSearch")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onAuthorization={handleLoginSubmit}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    onRegister={handleRegisterSubmit}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  handleLikeFilm={handleCardLikeMovie}
                  onDeleteCard={handleCardDislikeMovie}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleCardDislikeMovie}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onUpdateUser={handleEditUserInfo}
                  signOut={handleSignOut}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />
          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
