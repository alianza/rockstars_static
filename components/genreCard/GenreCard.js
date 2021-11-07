import Link from "next/link";
import React from "react";

export default function GenreCard(genre) {
    return (
        <Link href={`/genre/${encodeURIComponent(genre.genre)}`}>
            <button className={'button text-secondary'}>{genre.genre}</button>
        </Link>
    )
}
