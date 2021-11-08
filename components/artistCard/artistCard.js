import React from "react";
import Link from "next/link";
import encodeURICustom from "../../lib/encodeURLs";

function ArtistCard(props) {
    return (
        <Link href={`/artist/${encodeURICustom(props.artist.name)}`}>
            <a>
                <button className={'button text-secondary'}>{props.artist.name}</button>
            </a>
        </Link>
    );
}

export default ArtistCard;
