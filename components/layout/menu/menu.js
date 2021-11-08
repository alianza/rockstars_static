import Link from "next/link";
import { useRouter } from "next/router";
import styles from './menu.module.scss'

function Menu(props) {
    let router = useRouter()

    const about = () => {
        alert('This is a Next.js based music library Application!\n' +
            'Based on the Team Rockstars IT Tech Case, but now statically generated!\n' +
            'Made by Jan-Willem van Bremen - 2021')
    }

    const closeMenuIfMobile = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active')
        }
    }

    return (
        <nav id="menu" className={styles.menu}>
            <div onClick={e => props.onMenuClick(e)} className={styles.close}>✖</div>
            <h1 className="my-4">Menu</h1>
            <ul onClick={() => closeMenuIfMobile()}>
                <li className={styles.item}><Link href="/"><a className={`${router.pathname === "/" ? styles.active : ""} ${styles.link}`}>Artists</a></Link></li>
                <li className={styles.item}><Link href="/songs"><a className={`${router.pathname === "/songs" ? styles.active : ""} ${styles.link}`}>All Songs</a></Link></li>
                <li className={styles.item}><Link href="/genres"><a className={`${router.pathname === "/genres" ? styles.active : ""} ${styles.link}`}>All Genres</a></Link></li>
                <li className={styles.item} onClick={about}><a className={styles.link}>About</a></li>
            </ul>
            <p className="bottom-8 absolute">Jan-Willem van Bremen</p>
        </nav>
    );
}

export default Menu;
