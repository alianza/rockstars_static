import Link from "next/link"
import React from "react"
import encodeURICustom from "../../lib/encodeURLs"

export default function GenreCard(props) {
    return (
        <Link href={`/genre/${encodeURICustom(props.genre)}`}>
            <a className={`button text-secondary`}>
                {props.genre}
            </a>
        </Link>
    )
}
