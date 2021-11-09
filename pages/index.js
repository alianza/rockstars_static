import MusicService from "../lib/services/musicService"
import ArtistCard from "../components/artistCard/artistCard"
import ScrollToTopButton from "../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"

export async function getStaticProps() {
    const artists = await MusicService.getArtists()

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
        <div id={'artists'} className={'flex flex-wrap justify-between gap-y-2 gap-x-px'}>
            <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                <h1>All Artists</h1>
                <input className={'p-2 text-rockstar-grey w-full mobile:w-auto'} placeholder={'Search artists! 👨‍🎤'}
                       onChange={event => setQuery(event.target.value?.toLowerCase())}/>
            </div>

            {filteredArtists?.length ?
                filteredArtists.map(artist =>
                    <ArtistCard key={artist.id} artist={artist}/>) :
                <h3>No results...</h3>}
            {filteredArtists?.length > 50 && <ScrollToTopButton/>}

            <style jsx>{`
            #artists:after {
                content: '';
                flex: auto;
                }
            `}</style>
        </div>
    )
}
