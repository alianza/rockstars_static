import React, { useState } from "react"
import SongCard from "../../components/songCard/songCard"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import MusicService from "../../lib/services/musicService"
import { compress, decompress } from 'compress-json'
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton.js"
import triggerLoader from "../../lib/triggerLoader"
import { useRouter } from "next/router"

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
    const router = useRouter()
    songs = decompress(songs)
    const [filteredSongs, setFilteredSongs] = useState(songs)

    return (
        <div id="songs" className="flex flex-wrap justify-between gap-2">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <div className="flex items-center gap-4">
                    <h1>All Songs</h1>
                    <button className="button !p-2 shadow-3xl !w-auto" onClick={() => setFilteredSongs([...filteredSongs]?.reverse())}>Sort ⇕</button>
                </div>
                <input className="p-2 text-rockstar-grey  w-full mobile:w-auto" placeholder="Search songs! 🎵"
                       onChange={e => { triggerLoader(router); setFilteredSongs(songs?.filter(song => {
                           return Object.values(song).some(value => { return value?.toString().toLowerCase().includes(e.target.value?.toLowerCase())})}))}}/>
            </div>

            {filteredSongs.length ? filteredSongs.map((song, index) =>
                <SongCard showArtist showGenre key={`${song.name} ${song.artist}`} song={song} hidden={index >= 50}/>
            ) : <h3>No results...</h3>}
            {filteredSongs?.length >= 50 && <ScrollToTopButton/>}
            {filteredSongs?.length >= 50 && <LoadMoreButton fullWidth/>}
        </div>
    )
}
