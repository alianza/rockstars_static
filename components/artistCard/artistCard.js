import React from "react"
import Link from "next/link"

export default function ArtistCard(props) {
    return (
        <Link href={`/artist/${encodeURIComponent(props.artist.name)}`}>
            <a className={`button text-secondary${props.hidden ? ' hidden' : ''}`}>
                {props.artist.name}
            </a>
        </Link>
    )
}
