import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton";
import React, { useState } from "react";
import MusicService from "../../lib/services/musicService";
import Layout from "../../components/layout/layout/layout";
import GenreCard from "../../components/genreCard/GenreCard";

export async function getStaticProps() {
    const songs = await MusicService.getSongs()

    // Get unique genres
    const genres = songs.map(genre => genre.genre).filter((value, index, self) => self.indexOf(value) === index)

    return {
        props: {
            genres
        }
    }
}

export default function Genres({ genres }) {
    const [query, setQuery] = useState('')

    return (
        <Layout>
            <div id={'genres'} className={'flex flex-wrap justify-between gap-2'}>
                <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                    <h1>All Genres</h1>
                    <input className={'p-2 text-rockstar-grey'} placeholder={'Search songs! 🎵'}
                           onChange={event => setQuery(event.target.value?.toLowerCase())}/>
                </div>
                <div className={'w-full'}>
                    <h2>{genres?.filter(genre => genre.toLowerCase().includes(query)).length} Genre{genres?.filter(genre => genre.toLowerCase().includes(query)).length !== 1 && 's'}:
                    </h2>
                </div>
                {genres?.filter(genre => genre.toLowerCase().includes(query)).length ?
                    genres?.filter(genre => genre.toLowerCase().includes(query)).map(genre =>
                        <GenreCard key={genre.name} genre={genre}/>) :
                    <h3>No results...</h3>}
                {genres?.length > 50 && <ScrollToTopButton/>}
            </div>

            <style jsx>{`
                #genres:after {
                    content: '';
                    flex: auto;
                    }
                `}</style>
        </Layout>
    )
}
