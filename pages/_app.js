import '../styles/tailwind.css'
import '../styles/global.scss'
import NextNProgress from "nextjs-progressbar"
import { useState } from "react"
import Layout from "../components/layout/layout/layout"
import Head from "next/head"
import { useDarkThemeListener } from "../lib/eventListeners"

export default function MyApp({Component, pageProps}) {
    const [darkTheme, setDarkTheme] = useState(false)

    useDarkThemeListener(setDarkTheme)

    return (
    <Layout>
        <Head>
            <meta name="theme-color" content={darkTheme ? '#ffe000' : '#232323'}/>
        </Head>
        <NextNProgress color={darkTheme ? '#232323' : '#ffe000'}/>
        <Component {...pageProps} />
    </Layout>)
}
