import React from "react";
import Link from "next/link";

function ArtistCard(props) {
    return (
        <Link href={`/artist/${encodeURIComponent(props.artist.name)}`}>
            <button className={'button text-secondary'}>{props.artist.name}</button>
        </Link>
    );
}

export default ArtistCard;
