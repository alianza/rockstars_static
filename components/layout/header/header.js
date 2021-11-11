import styles from './header.module.scss'
import Image from "next/image"
import React from "react"

export default function Header(props) {

    return (
        <header id="header" className={styles.header}>
            <div className="flex text-primary items-center">
                <div onClick={e => props.onMenuClick(e)} className={styles.icon}>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <h1 className={styles.title}>{props.title}</h1>
            </div>
            <a href="https://teamrockstars.nl/" className="transition-transform hover:scale-110 active:scale-100 my-auto">
                <Image
                    src="/assets/logo.png"
                    alt="Team Rockstars IT Logo"
                    className="top-0 right-0"
                    width={48}
                    height={48}
                />
            </a>
        </header>
    )
}
