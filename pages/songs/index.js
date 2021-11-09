import React, { useState } from "react"
import SongCard from "../../components/songCard/songCard"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import MusicService from "../../lib/services/musicService"
import { compress, decompress } from 'compress-json'

export async function getStaticProps() {
    let songs = await MusicService.getSongs()

    songs = songs.map(song => { // Trim unneeded properties from songs
        const { id, bpm, duration, shortname, ...trimmedSongs } = song
        return trimmedSongs
    })

    songs = compress(songs)

    return {
        props: {
            songs
        }
    }
}

export default function Songs({songs}) {
    const [query, setQuery] = useState('')

    songs = decompress(songs)

    const filteredSongs = songs?.filter(song => song.name.toLowerCase().includes(query))

    return (
        <div id={'songs'} className={'flex flex-wrap justify-between gap-2'}>
            <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                <h1>All Songs</h1>
                <input className={'p-2 text-rockstar-grey  w-full mobile:w-auto'} placeholder={'Search songs! 🎵'}
                       onChange={event => setQuery(event.target.value?.toLowerCase())}/>
            </div>

            {filteredSongs.length ?
                filteredSongs.map(song =>
                    <SongCard showArtist showGenre key={`${song.name} ${song.artist}`} song={song}/>) :
                <h3>No results...</h3>}
            {filteredSongs?.length > 50 && <ScrollToTopButton/>}
        </div>
    )
}
