import Head from "next/head"
import Header from "../header/header"
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import { useEffect, useState } from "react"
import localStorageService from "../../../lib/services/localStorageService"
import useTheme from "../../../lib/theme"
import { useEventListeners } from "../../../lib/eventListeners"

const darkThemeKey = 'darkTheme'

export default function Layout({ children }) {
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => { setDarkTheme(localStorageService.getValue(darkThemeKey)) })

    useTheme(darkTheme)

    useEventListeners()

    const toggleMenu = () => { document.getElementById("app").classList.toggle("menu-active") }

    const toggleTheme = () => { localStorageService.setKeyValue(darkThemeKey, !darkTheme); setDarkTheme(prevTheme => !prevTheme) }

    return (
    <div id="app" className="menu-active">

        <Header onMenuClick={toggleMenu} title={'Rockstars IT!'}/>

        <Menu onMenuClick={toggleMenu}/>

        <main id="content">{children}</main>

        <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

    </div>)
}
