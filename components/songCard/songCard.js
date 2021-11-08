import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import PropTypes from 'prop-types';
import encodeURICustom from "../../lib/encodeURLs";

SongCard.propTypes = {
    showArtist: PropTypes.bool,
    showGenre: PropTypes.bool,
    song: PropTypes.shape({
        name: PropTypes.string,
        spotifyId: PropTypes.string,
        album: PropTypes.string,
        artist: PropTypes.string,
        year: PropTypes.number,
    })
}

function SongCard(props) {
    const spotifyUrl = `https://open.spotify.com/track/${props.song.spotifyId}`

    return (
        <div id="songCard" className={'relative bg-secondary p-4 w-full desktop:w-[calc(50%-.25em)]'}>
            <span className={'text-primary block mobile:mr-20'}>Title: <b>{props.song.name}</b></span>
            <span className={'text-primary block'}>Album: <b>{props.song.album}</b></span>
            {props.showArtist && <span className={'text-primary block'}>Artist: <Link href={`/artist/${encodeURICustom(props.song.artist)}`}><a><b>{props.song.artist}</b></a></Link></span> }
            {props.showGenre && <span className={'text-primary block'}>Genre: <Link href={`/genre/${encodeURICustom(props.song.genre)}`}><a><b>{props.song.genre}</b></a></Link></span> }
            <span className={'text-primary block mr-20 mobile:mr-0'}>Year: <b>{props.song.year}</b></span>
            <a className={'absolute w-[100px] bottom-0 right-0 mobile:top-0 mobile:bottom-auto '} href={spotifyUrl} target={'_blank'} rel={'noreferrer'}>
                <Image
                    layout={'responsive'}
                    width={1200}
                    height={494}
                    src="/assets/spotify.png"
                    alt={'Listen on Spotify!'}
                    className={'transition-transform hover:scale-105'}
                />
            </a>
        </div>
    );
}

export default SongCard;
