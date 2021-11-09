import React from "react"
import Link from "next/link"
import encodeURICustom from "../../lib/encodeURLs"

export default function ArtistCard(props) {
    return (
        <Link href={`/artist/${encodeURICustom(props.artist.name)}`}>
            <a className={`button text-secondary${props.hidden ? ' hidden' : ''}`}>
                {props.artist.name}
            </a>
        </Link>
    )
}
