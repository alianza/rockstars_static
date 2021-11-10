import MusicService from "../../lib/services/musicService"
import SongCard from "../../components/songCard/songCard"
import React from "react"
import { useRouter } from "next/router"
import SOrNot from "../../components/sOrNot"

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
                name: decodeURI(artist.name)
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export default function artist({ songs }) {
    const router = useRouter()

    const albums = songs?.map(song => song.album).filter((album, index, self) => self.indexOf(album) === index)
    const oldest = songs?.length ? songs?.reduce((a, b) => a.year < b.year ? a : b) : ''
    const newest = songs?.length ? songs?.reduce((a, b) => a.year > b.year ? a : b) : ''

    return (
        <div id="artist" className="flex flex-wrap justify-between gap-2">
            <div className="w-full">
                <h1 className="mb-4">Artist: "{router.query.name}"</h1>
                <span className="text-xl block">{albums.length} Album<SOrNot arrayLength={albums.length}/></span>
                <span className="text-xl block">{oldest.year} - {newest.year}</span>
                <h2>{songs?.length} Song<SOrNot arrayLength={songs?.length} withColon /></h2>
            </div>
            {songs && songs.map(song => <SongCard key={song.id} song={song} showGenre/>)}
        </div>
    )
}
