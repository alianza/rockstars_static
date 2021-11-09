import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <h1>404 Oops...</h1>
            <h2>Page not found!</h2>
            <span>Go back <b><Link href="/"><a>Home</a></Link></b>.</span>
        </div>
    )
}
