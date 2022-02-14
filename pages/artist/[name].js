import MusicService from "../../lib/services/musicService"
import SongCard from "../../components/songCard/songCard"
import React, { useState } from "react"
import { useRouter } from "next/router"
import SOrNot from "../../lib/sOrNot"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../../lib/triggerLoader"
import filterSongs from "../../lib/filterSongs"
import styles from "../../styles/sharedModules/page.module.scss"

export async function getStaticProps({ params }) {
    const songs = await MusicService.getSongsByArtistName(encodeURIComponent(params.name))

    return {
        props: {
            songs
        }
    }
}

export async function getStaticPaths() {
    const artists = await MusicService.getArtists()

    const paths = artists.map(artist => {
        return {
            params: {
                name: artist.name
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export default function artist({ songs }) {
    const pageSize = 25
    const router = useRouter()
    const [filteredSongs, setFilteredSongs] = useState(songs)
    const [page, setPage] = useState(1)
    const filteredPagedSongs = filteredSongs.slice(0, page * pageSize)

    const albums = songs?.map(song => song.album).filter((album, index, self) => self.indexOf(album) === index)
    const oldestSong = songs?.length ? songs?.reduce((a, b) => a.year < b.year ? a : b) : ''
    const newestSong = songs?.length ? songs?.reduce((a, b) => a.year > b.year ? a : b) : ''

    const handleFilterChange = (e) => {
        triggerLoader(router)
        setPage(1)
        setFilteredSongs(filterSongs(songs, e.target.value))
    }

    return (
        <div id="artist" className={styles.page}>
            <div className={styles.header}>
                <h1>Artist: "{router.query.name}"</h1>
                <input className={styles.searchButton} placeholder="Search songs! 🎵" onChange={e => handleFilterChange(e)}/>
                <span className={`text-xl ${styles.fullWidthPar}`}>{oldestSong.year} - {newestSong.year}</span>
                <span className={`text-xl ${styles.fullWidthPar}`}>{albums.length} Album<SOrNot arrayLength={albums.length}/></span>
                <h2 className={styles.fullWidthPar}>{filteredSongs.length} Song<SOrNot arrayLength={filteredSongs.length} withColon /></h2>
            </div>
            {filteredPagedSongs.length ? filteredPagedSongs.map(song =>
              <SongCard key={song.id} song={song} showGenre/>) : <h3>No results...</h3>}
            {filteredSongs.length > 50 && <ScrollToTopButton/>}
            {!(filteredPagedSongs.length === filteredSongs.length) &&
            <LoadMoreButton fullWidth loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}
        </div>
    )
}
