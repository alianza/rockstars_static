import Layout from "../../components/layout/layout/layout";
import MusicService from "../../lib/services/musicService";
import SongCard from "../../components/songCard/songCard";
import React, { useState } from "react";
import { useRouter } from "next/router";
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton";

export async function getStaticProps({ params }) {
    const songs = await MusicService.getSongsByGenreName(encodeURIComponent(params.name))

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
    const router = useRouter()
    const [query, setQuery] = useState('')

    const filteredSongs = songs?.filter(song => song.name.toLowerCase().includes(query))

    return (
        <div id={'genre'} className={'flex flex-wrap justify-between gap-2'}>
            <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                <h1>Genre: "{router.query.name}"</h1>
                <input className={'p-2 text-rockstar-grey'} placeholder={'Search songs! 🎵'} onChange={event => setQuery(event.target.value?.toLowerCase())}/>
            </div>
            <div className={'w-full'}>
                <h2>{filteredSongs.length} Song{filteredSongs.length !== 1 && 's'}:</h2>
            </div>
            {filteredSongs.length ?
                filteredSongs.map(song =>
                    <SongCard key={song.id} showArtist song={song}/>) :
                <h3>No results...</h3>}
            {filteredSongs?.length > 50 && <ScrollToTopButton/>}
        </div>
    )
}
