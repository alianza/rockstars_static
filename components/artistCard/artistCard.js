import React from "react";
import Link from "next/link";

function ArtistCard(props) {
    return (
        <Link href={`/artist/${encodeURIComponent(props.artist.name)}`}>
            <a>
                <button className={'button text-secondary'}>{props.artist.name}</button>
            </a>
        </Link>
    );
}

export default ArtistCard;
