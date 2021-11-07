import Layout from "../components/layout/layout/layout";
import MusicService from "../lib/services/musicService";
import ArtistCard from "../components/artistCard/artistCard";
import ScrollToTopButton from "../components/scrollToTopButton/scrollToTopButton";
import React, { useState } from "react";

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

    return (
        <Layout>
            <div id={'artists'} className={'flex flex-wrap justify-between gap-2'}>
                <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                    <h1>All Artists</h1>
                    <input className={'p-2 text-rockstar-grey'} placeholder={'Search artists! 👨‍🎤'} onChange={event => setQuery(event.target.value?.toLowerCase())}/>
                </div>

                {artists?.filter(artist => artist.name.toLowerCase().includes(query))?.length ?
                    artists?.filter(artist => artist.name.toLowerCase().includes(query)).map(artist =>
                        <ArtistCard key={artist.id} artist={artist}/>) :
                    <h3>No results...</h3>}
                {artists?.length > 50 && <ScrollToTopButton/>}

                <style jsx>{`
                #artists:after {
                    content: '';
                    flex: auto;
                    }
                `}</style>
            </div>
        </Layout>
    )
}
