import styles from './header.module.scss'

export default function Header(props) {

    return (
        <header id="header" className={styles.header}>
            <div className="flex text-primary">
                <div onClick={e => props.onMenuClick(e)} className={styles.icon}>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <h1 className={styles.title}>{props.title}</h1>
            </div>
        </header>
    )
}
