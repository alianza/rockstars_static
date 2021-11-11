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
    const router = useRouter()
    const [filteredArtists, setFilteredArtists] = useState(artists)

    function filterArtists(e) {
        triggerLoader(router)
        setFilteredArtists(artists?.filter(artist => {
            return artist?.name.toLowerCase().includes(e.target.value?.toLowerCase())
        }))
    }

    return (
        <div id="artists" className="flex flex-wrap justify-between gap-y-2 gap-x-px">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <div className="flex items-center gap-4 w-full mobile:w-auto justify-between mobile:justify-start">
                    <h1>All Artists</h1>
                    <button className="button !p-2 shadow-3xl !w-auto" onClick={() => setFilteredArtists([...filteredArtists]?.reverse())}>Sort ⇕</button>
                </div>
                <input className="p-2 text-rockstar-grey w-full mobile:w-auto" placeholder="Search artists! 👨‍🎤" onChange={e => filterArtists(e)}/>
            </div>

            {filteredArtists?.length ? filteredArtists.map((artist, index) =>
                <ArtistCard key={artist.name} artist={artist} hidden={index >= 150}/>
            ) : <h3>No results...</h3>}
            {filteredArtists?.length >= 50 && <ScrollToTopButton/>}
            {filteredArtists?.length >= 150 && <LoadMoreButton amount={150}/>}
        </div>
    )
}
