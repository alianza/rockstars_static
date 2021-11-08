import React, { useEffect, useState } from "react";
import Loader from "../../lib/loader";
import SongCard from "../../components/songCard/songCard";
import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton";
import MusicService from "../../lib/services/musicService";
import Layout from "../../components/layout/layout/layout";

export async function getStaticProps() {
    let songs = await MusicService.getSongs()

    // Trim unneeded properties from songs
    songs = songs.map(song => {
        const { bpm, duration, shortname, ...trimmedSongs } = song;
        return trimmedSongs;
    });

    return {
        props: {
            songs
        }
    }
}

function Songs({ songs }) {
    const [query, setQuery] = useState('')

    return (
        <Layout>
            <div id={'songs'} className={'flex flex-wrap justify-between gap-2'}>
                <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                    <h1>All Songs</h1>
                    <input className={'p-2 text-rockstar-grey'} placeholder={'Search songs! 🎵'} onChange={event => setQuery(event.target.value?.toLowerCase())}/>
                </div>

                {songs?.filter(song => song.name.toLowerCase().includes(query)).length ?
                    songs?.filter(song => song.name.toLowerCase().includes(query)).map(song =>
                        <SongCard showArtist showGenre key={song.id} song={song}/>) :
                    <h3>No results...</h3>}
                {songs?.length > 50 && <ScrollToTopButton/>}
            </div>
        </Layout>
    );
}

export default Songs;
