import Link from "next/link"
import React from "react"

export default function GenreCard(props) {
    return (
        <Link href={`/genre/${encodeURIComponent(props.genre)}`}>
            <a className={`button text-secondary ${props.hidden ? 'hidden' : ''}`}>
                {props.genre}
            </a>
        </Link>
    )
}
