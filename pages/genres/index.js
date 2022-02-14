import ScrollToTopButton from "../../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import MusicService from "../../lib/services/musicService"
import GenreCard from "../../components/genreCard/genreCard"
import LoadMoreButton from "../../components/loadMoreButton/loadMoreButton.js"
import triggerLoader from "../../lib/triggerLoader"
import { useRouter } from "next/router"
import PageHeader from "../../components/pageHeader/pageHeader"
import styles from "../../styles/sharedModules/page.module.scss"

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
    const pagedFilteredGenres = filteredGenres.slice(0, page * pageSize)

    function handleFilterChange(e) {
        triggerLoader(router)
        setPage(1)
        setFilteredGenres(genres?.filter(genre => genre.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div id="genres" className={styles.page}>
            <PageHeader
              title="All Genres"
              searchPlaceholder="Search genres! 🎵"
              onSortButtonClick={() => setFilteredGenres([...filteredGenres].reverse())}
              onSearchValueChange={e => handleFilterChange(e)}
            />
            <div className="w-full">
                <h2>{filteredGenres.length} Genre{filteredGenres.length !== 1 && 's'}</h2>
            </div>
            {pagedFilteredGenres.length ? pagedFilteredGenres.map(genre =>
              <GenreCard key={genre} genre={genre}/>) : <h3>No results...</h3>}
            {filteredGenres.length >= 50 && <ScrollToTopButton/>}
            {!(pagedFilteredGenres.length === filteredGenres.length) &&
            <LoadMoreButton loadMore={() => { triggerLoader(router); setPage(page + 1) }}/>}
        </div>
    )
}
