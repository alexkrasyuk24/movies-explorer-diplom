import React from "react"
import AboutMe from "../AboutMe/AboutMe"
import Promo from "../Promo/Promo"
import AboutProject from "../AboutProject/AboutProject"
import Portfolio from "../Portfolio/Portfolio"
import Techs from "../Techs/Techs"


function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main
