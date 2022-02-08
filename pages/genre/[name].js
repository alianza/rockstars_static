import MusicService from "../../lib/services/musicService"
import SongCard from "../../components/songCard/songCard"
import React, { useState } from "react"
import { useRouter } from "next/router"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import SOrNot from "../../lib/sOrNot"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../../lib/triggerLoader"
import filterSongs from "../../lib/filterSongs"

export async function getStaticProps({ params }) {
    let songs = await MusicService.getSongsByGenreName(encodeURIComponent(params.name))

    songs = songs.map(song => { // Trim unneeded properties from songs
        const { bpm, duration, shortname, ...trimmedSongs } = song
        return trimmedSongs
    })

    return {
        props: {
            songs
        }
    }
}

export async function getStaticPaths() {
    const songs = await MusicService.getSongs()

    let paths = songs.map(song => {
        return {
            params: {
                name: song.genre
            }
        }
    })

    // filter out only unique paths
    paths = paths.filter((path, index, self) =>
        index === self.findIndex((t) => (
            t.params.name === path.params.name
        ))
    )

    return {
        paths,
        fallback: false
    }
}

export default function genre({ songs }) {
    const pageSize = 50
    const router = useRouter()
    const [filteredSongs, setFilteredSongs] = useState(songs)
    const [page, setPage] = useState(1)

    const handleFilterChange = (e) => {
        triggerLoader(router)
        setPage(1)
        setFilteredSongs(filterSongs(songs, e.target.value))
    }

    return (
        <div id="genre" className="flex flex-wrap justify-between gap-2">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <div className="flex items-center gap-4 w-full mobile:w-auto justify-between mobile:justify-start">
                    <h1>Genre: "{router.query.name}"</h1>
                    <button className="button !p-2 shadow-3xl !w-auto" onClick={() => setFilteredSongs([...filteredSongs]?.reverse())}>Sort ⇕</button>
                </div>
                <input className="p-2 text-rockstar-grey  w-full mobile:w-auto" placeholder="Search songs! 🎵" onChange={e => handleFilterChange(e)}/>
            </div>
            <div className="w-full">
                <h2>{filteredSongs?.length} Song<SOrNot arrayLength={filteredSongs?.length} withColon /></h2>
            </div>
            {filteredSongs.slice(0, page * pageSize).length ? filteredSongs.slice(0, page * pageSize).map(song =>
                <SongCard showArtist key={song.id} song={song}/>
            ) : <h3>No results...</h3>}
            {filteredSongs?.length > 50 && <ScrollToTopButton/>}
            {!(filteredSongs.slice(0, page * pageSize).length === filteredSongs.length) &&
            <LoadMoreButton fullWidth loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}        </div>
    )
}
