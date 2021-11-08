import React from "react"
import NightsStayIcon from '@material-ui/icons/NightsStay'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import styles from './footer.module.scss'

export default function Footer(props) {
    return (
        <footer id="footer" className={styles.footer}>
            <p className={styles.text}>Team Rockstars IT Tech Case - Music App</p>
                <button className="button yellow" aria-label="Switch theme" onClick={() => props.onThemeButtonClick()}>{props.darkTheme ? <Brightness7Icon/> : <NightsStayIcon/>}</button>
        </footer>
    )
}
