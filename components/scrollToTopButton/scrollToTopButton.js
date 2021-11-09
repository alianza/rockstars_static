import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import React, { useEffect, useState } from "react"

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
                window.scrollTo({top: 0, behavior: 'smooth'})
            })
        )
    }

    return (
        <button className={`button inverted${showButton ? '' : ' hidden'} fixed top-16 scale-90 mobile:scale-x-100 left-0 mobile:left-[initial] mobile:right-4 z-[5] shadow-3xl`} aria-label="Back to the top" onClick={scrollToTop}>
            <ArrowUpwardIcon/>
        </button>
    )
}
