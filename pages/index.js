import MusicService from "../lib/services/musicService"
import ArtistCard from "../components/artistCard/artistCard"
import ScrollToTopButton from "../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import LoadMoreButton from "../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../lib/triggerLoader"
import { useRouter } from "next/router"

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

export default function Home({ artists }) {
    const pageSize = 150
    const router = useRouter()
    const [filteredArtists, setFilteredArtists] = useState(artists)
    const [page, setPage] = useState(1)

    function filterArtists(e) {
        triggerLoader(router)
        setPage(1)
        setFilteredArtists(artists.filter(artist => {
            return artist.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    return (
        <div id="artists" className="flex flex-wrap justify-between gap-y-2 gap-x-px">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <div className="flex items-center gap-4 w-full mobile:w-auto justify-between mobile:justify-start">
                    <h1>All Artists</h1>
                    <button className="button !p-2 shadow-3xl !w-auto" onClick={() => setFilteredArtists([...filteredArtists].reverse())}>Sort ⇕</button>
                </div>
                <input className="p-2 text-rockstar-grey w-full mobile:w-auto" placeholder="Search artists! 👨‍🎤" onChange={e => filterArtists(e)}/>
            </div>

            {filteredArtists.slice(0, page * pageSize).length ? filteredArtists.slice(0, page * pageSize).map(artist =>
                <ArtistCard key={artist.name} artist={artist}/>
            ) : <h3>No results...</h3>}
            {filteredArtists.length >= 50 && <ScrollToTopButton/>}
            {!(filteredArtists.slice(0, page * pageSize).length === filteredArtists.length) &&
            <LoadMoreButton loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}
        </div>
    )
}
