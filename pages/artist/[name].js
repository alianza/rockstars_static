import Layout from "../../components/layout/layout/layout";
import MusicService from "../../lib/services/musicService";
import SongCard from "../../components/songCard/songCard";
import React from "react";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
    const songs = await MusicService.getSongsByArtistName(params.name)

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
    const router = useRouter()

    return (
        <Layout>
            <div id={'artist'} className={'flex flex-wrap justify-between gap-2'}>
                <div className={'w-full'}>
                    <h1 className={'mb-4'}>Artist: "{router.query.name}"</h1>
                    <h2>{songs?.length} Song{songs?.length !== 1 && 's'}{songs?.length !== 0 && ':'}</h2>
                </div>
                {songs && songs.map(song => <SongCard key={song.id} song={song}/> )}
            </div>
        </Layout>
    )
}
