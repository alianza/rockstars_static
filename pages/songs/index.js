import React, { useState } from "react"
import SongCard from "../../components/songCard/songCard"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import MusicService from "../../lib/services/musicService"
import { compress, decompress } from 'compress-json'
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton.js"
import triggerLoader from "../../lib/triggerLoader"
import { useRouter } from "next/router"
import filterSongs from "../../lib/filterSongs"
import PageHeader from "../../components/pageHeader/pageHeader"
import styles from "../../styles/sharedModules/page.module.scss"

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
    const pageSize = 50
    const router = useRouter()
    songs = decompress(songs)
    const [filteredSongs, setFilteredSongs] = useState(songs)
    const [page, setPage] = useState(1)
    const filteredPagedSongs = filteredSongs.slice(0, page * pageSize)

    const handleFilterChange = (e) => {
        triggerLoader(router)
        setPage(1)
        setFilteredSongs(filterSongs(songs, e.target.value))
    }

    const loadMore = () => {
        triggerLoader(router)
        setPage(page + 1)
    }

    return (
        <div id="songs" className={styles.page}>
            <PageHeader
              title={'All Songs '}
              searchPlaceholder={'Search songs! 🎵'}
              onSortButtonClick={() => setFilteredSongs([...filteredSongs].reverse())}
              onSearchValueChange={e => handleFilterChange(e)}
            />
            {filteredPagedSongs.length ? filteredPagedSongs.map(song =>
              <SongCard showArtist showGenre key={`${song.name} ${song.artist}`} song={song}/>) :
              <h3>No results...</h3>}
            {filteredSongs.length >= 50 && <ScrollToTopButton/>}
            {!(filteredPagedSongs.length === filteredSongs.length) &&
            <LoadMoreButton fullWidth loadMore={loadMore}/>}
        </div>
    )
}
