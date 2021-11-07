import Link from "next/link";
import { useRouter } from "next/router";

function Menu(props) {
    let router = useRouter()

    const about = () => {
        alert('This is a Next.js based music library Application!\n' +
            'Based on the Team Rockstars IT Tech Case, but now statically generated!\n' +
            'Made by Jan-Willem van Bremen - 2021');
    }

    const closeMenuIfMobile = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active')
        }
    }

    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top" onClick={() => closeMenuIfMobile()}>
                <li><Link href="/"><a className={router.pathname === "/" ? "active" : ""}>Artists</a></Link></li>
                <li><Link href="/songs"><a className={router.pathname === "/songs" ? "active" : ""}>All Songs</a></Link></li>
                <li><Link href="/genres"><a className={router.pathname === "/genres" ? "active" : ""}>All Genres</a></Link></li>
                <li onClick={about}>About</li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    );
}

export default Menu;
