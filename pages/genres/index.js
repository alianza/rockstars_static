import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import MusicService from "../../lib/services/musicService"
import GenreCard from "../../components/genreCard/genreCard"

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

    const filteredGenres = genres?.filter(genre => genre.toLowerCase().includes(query))

    return (
        <div id={'genres'} className={'flex flex-wrap justify-between gap-y-2'}>
            <div className={'flex justify-between flex-wrap gap-4 mb-4 w-full'}>
                <h1>All Genres</h1>
                <input className={'p-2 text-rockstar-grey w-full mobile:w-auto'} placeholder={'Search genres! 🎵'}
                       onChange={event => setQuery(event.target.value?.toLowerCase())}/>
            </div>
            <div className={'w-full'}>
                <h2>{filteredGenres.length} Genre{filteredGenres.length !== 1 && 's'}:
                </h2>
            </div>
            {filteredGenres.length ?
                filteredGenres.map(genre =>
                    <GenreCard key={genre} genre={genre}/>) :
                <h3>No results...</h3>}
            {filteredGenres?.length > 50 && <ScrollToTopButton/>}
        </div>
    )
}
