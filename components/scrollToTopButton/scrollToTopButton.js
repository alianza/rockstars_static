import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import React, { useEffect, useState } from "react"
import styles from "./scrollToTopButton.module.scss"

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false)
    const requiredScrollAmount = 1000

    useEffect(() => {
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    const onScroll = () => {
        setShowButton(document.body.scrollTop > requiredScrollAmount || document.documentElement.scrollTop > requiredScrollAmount)
    }

    const scrollToTop = () => {
        requestAnimationFrame((() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        )
    }

    return (
        <button className={`button inverted ${styles.scrollToTopButton} ${showButton ? '' : ' hidden'}`} aria-label="Back to top" onClick={scrollToTop}>
            <ArrowUpwardIcon/>
        </button>
    )
}
