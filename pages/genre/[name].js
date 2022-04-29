import MusicService from "../../lib/services/musicService"
import SongCard from "../../components/songCard/songCard"
import React, { useState } from "react"
import { useRouter } from "next/router"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import SOrNot from "../../lib/sOrNot"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../../lib/triggerLoader"
import filterSongs from "../../lib/filterSongs"
import PageHeader from "../../components/pageHeader/pageHeader"
import styles from "../../styles/sharedModules/page.module.scss"

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
    const pagedFilteredSongs = filteredSongs.slice(0, page * pageSize)

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
        <div id="genre" className={styles.page}>
            <PageHeader
              title={`Genre: "${router.query.name}"`}
              searchPlaceholder={'Search songs! 🎵'}
              onSortButtonClick={() => setFilteredSongs([...filteredSongs].reverse())}
              onSearchValueChange={e => handleFilterChange(e)}
            />
            <div className="w-full">
                <h2>{filteredSongs?.length} Song<SOrNot arrayLength={filteredSongs?.length} withColon /></h2>
            </div>
            {pagedFilteredSongs.length ?
              pagedFilteredSongs.map(song =>
              <SongCard showArtist key={song.id} song={song}/>) :
              <h3>No results...</h3>}
            {filteredSongs?.length > 50 && <ScrollToTopButton/>}
            {!(pagedFilteredSongs.length === filteredSongs.length) &&
            <LoadMoreButton fullWidth loadMore={loadMore}/>}
        </div>
    )
}
