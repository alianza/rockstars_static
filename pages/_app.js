import '../styles/tailwind.css'
import '../styles/global.scss'
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

function MyApp({Component, pageProps}) {
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => {
        document.body.addEventListener("change", function (e) {
            e.target.dataset.theme === "dark" ? setDarkTheme(true) : setDarkTheme(false)
        });
    })

    return <>
        <NextNProgress color={darkTheme ? '#232323' : '#ffe000'}/>
        <Component {...pageProps} />
    </>
}

export default MyApp
