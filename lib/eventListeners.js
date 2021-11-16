import { useEffect } from "react"

const useEventListeners = () => {
    useEffect(() => { // Listen for prefers-color-scheme css media query and window resize events
        const matchDarkMedia = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

        matchDarkMedia?.addEventListener('change', onColorSchemeChange) // Jest test environment doesn't support this

        window.addEventListener("resize", onResize)
        onResize()

        return function cleanup() {
            matchDarkMedia?.removeEventListener('change', onColorSchemeChange)
            window.removeEventListener("resize", onResize)
        }
    }, [])
}

const useDarkThemeListener = (setDarkTheme) => {
    useEffect(() => {
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => { setDarkTheme(mutation.target.dataset.theme === "dark") })
        })

        observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] })

        return function cleanup() { observer.disconnect() }
    }, [])
}

const onResize = () => {
    if (window.innerWidth < 600) {
        document.getElementById('app').classList.remove('menu-active')
    } else if (window.innerWidth > 900) {
        document.getElementById('app').classList.add('menu-active')
    }
}

const onColorSchemeChange = (e) => {
    document.body.dataset.theme = e.matches ? 'dark' : '' // Prefers light/dark
}

export { useEventListeners, useDarkThemeListener }
