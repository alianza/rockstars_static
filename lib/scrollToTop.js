export default function scrollToTop() {
    requestAnimationFrame(
        (function() {
            window.scrollTo({top: 0, behavior: 'smooth'})
        })
    )
}
