import Link from "next/link"
import React from "react"
import encodeURICustom from "../../lib/encodeURLs"

export default function GenreCard(genre) {
    return (
        <Link href={`/genre/${encodeURICustom(genre.genre)}`}>
            <a>
                <button className={'button text-secondary'}>{genre.genre}</button>
            </a>
        </Link>
    )
}
