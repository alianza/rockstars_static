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
        <Head>
            <title>Team Rockstars IT - Tech Case</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="Team Rockstars IT Tech Case statically rendered with Next.js"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="theme-color" content="#ffffff"/>
            <link rel="manifest" href="/manifest.json"/>
        </Head>

        <Header onMenuClick={toggleMenu} title={'Rockstars IT!'}/>

        <Menu onMenuClick={toggleMenu}/>

        <main id="content">{children}</main>

        <Footer darkTheme={darkTheme} onThemeButtonClick={toggleTheme}/>

    </div>)
}
