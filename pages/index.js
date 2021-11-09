import MusicService from "../lib/services/musicService"
import ArtistCard from "../components/artistCard/artistCard"
import ScrollToTopButton from "../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import LoadMoreButton from "../components/loadMoreButton/loadMoreButton"

export async function getStaticProps() {
    let artists = await MusicService.getArtists()

    artists = artists.map(artist => { // Trim unneeded properties from artists
        const { id, ...trimmedArtists } = artist
        return trimmedArtists
    })

    return {
        props: {
            artists
        }
    }
}

export default function Home({artists}) {
    const [query, setQuery] = useState('')

    const filteredArtists = artists?.filter(artist => artist.name.toLowerCase().includes(query))

    return (
        <div id="artists" className="flex flex-wrap justify-between gap-y-2 gap-x-px">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <h1>All Artists</h1>
                <input className="p-2 text-rockstar-grey w-full mobile:w-auto" placeholder="Search artists! 👨‍🎤"
                       onChange={event => setQuery(event.target.value?.toLowerCase())}/>
            </div>

            {filteredArtists?.length ?
                filteredArtists.map((artist, index) =>
                    <ArtistCard key={artist.id} artist={artist} hidden={index >= 150}/>
                ) :
                <h3>No results...</h3>}
            {filteredArtists?.length >= 50 && <ScrollToTopButton/>}
            {filteredArtists?.length >= 150 && <LoadMoreButton/>}
        </div>
    )
}
