import Link from "next/link"
import React from "react"
import encodeURICustom from "../../lib/encodeURLs"

export default function GenreCard(props) {
    return (
        <Link href={`/genre/${encodeURICustom(props.genre)}`}>
            <a id="genreCard" className={`button text-secondary ${props.hidden ? 'hidden' : ''}`}>
                {props.genre}
            </a>
        </Link>
    )
}
