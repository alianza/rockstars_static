import '../styles/tailwind.css'
import '../styles/global.scss'
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout/layout";

function MyApp({Component, pageProps}) {
    const [darkTheme, setDarkTheme] = useState(false)

    useEffect(() => {
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => { mutation.target.dataset.theme === "dark" ? setDarkTheme(true) : setDarkTheme(false) });
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

        return () => {
            observer.disconnect()
        };
    }, [])

    return (
    <Layout>
        <NextNProgress color={darkTheme ? '#232323' : '#ffe000'}/>
        <Component {...pageProps} />
    </Layout>)
}

export default MyApp
