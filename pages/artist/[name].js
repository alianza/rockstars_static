import MusicService from "../../lib/services/musicService"
import SongCard from "../../components/songCard/songCard"
import React, { useState } from "react"
import { useRouter } from "next/router"
import SOrNot from "../../components/sOrNot"
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../../lib/triggerLoader"

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

    const albums = songs?.map(song => song.album).filter((album, index, self) => self.indexOf(album) === index)
    const oldest = songs?.length ? songs?.reduce((a, b) => a.year < b.year ? a : b) : ''
    const newest = songs?.length ? songs?.reduce((a, b) => a.year > b.year ? a : b) : ''

    const filterSongs = (e) => {
        triggerLoader(router)
        if (page !== 1) { setPage(1) }
        setFilteredSongs(songs?.filter(song => {
            return Object.values({...song, spotifyId: ''}).some(value => {
                return value?.toString().toLowerCase().includes(e.target.value.toLowerCase())
        })}))
    }

    return (
        <div id="artist" className="flex flex-wrap justify-between gap-2">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <h1>Artist: "{router.query.name}"</h1>
                <input className="p-2 text-rockstar-grey w-full mobile:w-auto" placeholder="Search songs! 🎵" onChange={e => filterSongs(e)}/>
                <span className="text-xl w-full -mb-4">{oldest.year} - {newest.year}</span>
                <span className="text-xl w-full -mb-4">{albums.length} Album<SOrNot arrayLength={albums.length}/></span>
                <h2 className="w-full -mb-4">{filteredSongs.length} Song<SOrNot arrayLength={filteredSongs.length} withColon /></h2>
            </div>
            {filteredSongs.slice(0, page * pageSize).length ? filteredSongs.slice(0, page * pageSize).map(song =>
                <SongCard key={song.id} song={song} showGenre/>
            ) : <h3>No results...</h3>}
            {filteredSongs.length > 50 && <ScrollToTopButton/>}
            {!(filteredSongs.slice(0, page * pageSize).length === filteredSongs.length) &&
            <LoadMoreButton fullWidth loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}
        </div>
    )
}
