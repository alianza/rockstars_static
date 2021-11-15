import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import MusicService from "../../lib/services/musicService"
import GenreCard from "../../components/genreCard/genreCard"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton.js"
import triggerLoader from "../../lib/triggerLoader"
import { useRouter } from "next/router"

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
    const pageSize = 150
    const router = useRouter()
    const [filteredGenres, setFilteredGenres] = useState(genres)
    const [page, setPage] = useState(1)

    function filterGenres(e) {
        triggerLoader(router)
        setPage(1)
        setFilteredGenres(genres?.filter(genre => {
            return genre.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    return (
        <div id="genres" className="flex flex-wrap justify-between gap-y-2 gap-x-px">
            <div className="flex justify-between flex-wrap gap-4 mb-4 w-full">
                <div className="flex items-center gap-4 w-full mobile:w-auto justify-between mobile:justify-start">
                    <h1>All Genres</h1>
                    <button className="button !p-2 shadow-3xl !w-auto" onClick={() => setFilteredGenres([...filteredGenres]?.reverse())}>Sort ⇕</button>
                </div>
                <input className="p-2 text-rockstar-grey w-full mobile:w-auto" placeholder="Search genres! 🎵" onChange={e => filterGenres(e)}/>
            </div>
            <div className="w-full">
                <h2>{filteredGenres.length} Genre{filteredGenres.length !== 1 && 's'}</h2>
            </div>
            {filteredGenres.slice(0, page * pageSize).length ? filteredGenres.slice(0, page * pageSize).map(genre =>
                <GenreCard key={genre} genre={genre}/>
            ) : <h3>No results...</h3>}
            {filteredGenres.length >= 50 && <ScrollToTopButton/>}
            {!(filteredGenres.slice(0, page * pageSize).length === filteredGenres.length) &&
            <LoadMoreButton loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}
        </div>
    )
}
