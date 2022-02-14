import MusicService from "../lib/services/musicService"
import ArtistCard from "../components/artistCard/artistCard"
import ScrollToTopButton from "../components/scrollToTopButton/scrollToTopButton"
import React, { useState } from "react"
import LoadMoreButton from "../components/loadMoreButton/loadMoreButton"
import triggerLoader from "../lib/triggerLoader"
import { useRouter } from "next/router"
import PageHeader from "../components/pageHeader/pageHeader"
import styles from "../styles/sharedModules/page.module.scss"

export async function getStaticProps() {
    let artists = await MusicService.getArtists()

    artists = artists.map(artist => { // Trim unneeded properties from artists
        const { id, ...trimmedArtists } = artist
        return trimmedArtists
    })

    return {
        props: {
            artists
        }
    }
}

export default function Home({ artists }) {
    const pageSize = 150
    const router = useRouter()
    const [filteredArtists, setFilteredArtists] = useState(artists)
    const [page, setPage] = useState(1)
    const pagedFilteredArtists = filteredArtists.slice(0, page * pageSize)

    function handleFilterChange(e) {
        triggerLoader(router)
        setPage(1)
        setFilteredArtists(artists.filter(artist => artist.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div id="artists" className={styles.page}>
            <PageHeader
              title="All Artists"
              searchPlaceholder="Search artists! 👨‍🎤"
              onSortButtonClick={() => setFilteredArtists([...filteredArtists].reverse())}
              onSearchValueChange={e => handleFilterChange(e)}
            />
            {pagedFilteredArtists.length ? pagedFilteredArtists.map(artist =>
              <ArtistCard key={artist.name} artist={artist}/>) : <h3>No results...</h3>}
            {filteredArtists.length >= 50 && <ScrollToTopButton/>}
            {!(pagedFilteredArtists.length === filteredArtists.length) &&
              <LoadMoreButton loadMore={() => {triggerLoader(router);setPage(page + 1)}}/>}
        </div>
    )
}
